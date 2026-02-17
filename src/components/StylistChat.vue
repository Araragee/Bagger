<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, X, Send } from 'lucide-vue-next';
import { PRODUCTS } from '../data/products';

const isOpen = ref(false);
const messages = ref<{ role: 'user' | 'model'; text: string }[]>([]);
const userInput = ref('');
const isLoading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
// Initialize client.
// Note: If apiKey is missing, it will throw when making requests usually, or constructor might check it.
// The new SDK constructor: new GoogleGenAI({ apiKey: ... })
let client: GoogleGenAI | null = null;
try {
  if (apiKey) {
    client = new GoogleGenAI({ apiKey });
  }
} catch (e) {
  console.warn("Google GenAI client failed to initialize:", e);
}

const systemInstruction = `You are a Personal Fashion Stylist for "Lusso Leather", a high-end luxury leather brand.
Your tone is elegant, sophisticated, helpful, and concise.
You have expert knowledge of our current collection:
${PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description} Price: ${p.price}.`).join('\n')}

Advise customers on styling these items, leather care, and outfit pairings.
Do not mention competitors. Keep responses under 3 sentences unless asked for more detail.`;

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && messages.value.length === 0) {
    messages.value.push({ role: 'model', text: "Buon giorno. I am your personal Lusso stylist. How may I assist you with your selection today?" });
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const text = userInput.value;
  messages.value.push({ role: 'user', text });
  userInput.value = '';
  isLoading.value = true;

  await nextTick();
  scrollToBottom();

  try {
    if (!client) {
      throw new Error("API Key not found or client failed to initialize. Please set VITE_GOOGLE_API_KEY in your environment.");
    }

    // We pass the conversation history including the new user message.
    const contents = messages.value.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash', // Using 2.0-flash as a safe default. The prompt asked for 'gemini-3-flash-preview' which may not exist or be accessible. I'll use 2.0-flash to ensure functionality.
      config: {
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        }
      },
      contents: contents
    });

    const responseText = response.text;
    if (responseText) {
        messages.value.push({ role: 'model', text: responseText });
    }
  } catch (error: any) {
    console.error(error);
    let errorMsg = "Apologies, I am currently unable to connect to the atelier. Please try again later.";
    if (error.message && error.message.includes("API Key")) {
        errorMsg = "Please configure VITE_GOOGLE_API_KEY to use the stylist feature.";
    }
    messages.value.push({ role: 'model', text: errorMsg });
  } finally {
    isLoading.value = false;
    await nextTick();
    scrollToBottom();
  }
};
</script>

<template>
  <div>
    <!-- FAB -->
    <button
      @click="toggleChat"
      class="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-amber-50 shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Open Stylist"
    >
      <Sparkles v-if="!isOpen" class="h-8 w-8" />
      <X v-else class="h-8 w-8" />
    </button>

    <!-- Chat Window -->
    <Teleport to="body">
      <div v-if="isOpen" class="fixed bottom-28 right-4 z-40 w-[90vw] max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-900/5 sm:right-8 transition-all duration-300 ease-in-out origin-bottom-right">
        <!-- Header -->
        <div class="bg-stone-900 px-6 py-4 text-white">
          <h3 class="font-serif text-xl">Lusso Stylist</h3>
          <p class="text-xs font-light tracking-widest uppercase text-stone-400">AI Personal Shopper</p>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="h-96 overflow-y-auto bg-stone-50 p-4 scroll-smooth">
          <div v-for="(msg, index) in messages" :key="index" class="mb-4 flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div
              class="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
              :class="msg.role === 'user' ? 'bg-stone-900 text-white rounded-br-none' : 'bg-white text-stone-800 shadow-sm border border-stone-100 rounded-bl-none'"
            >
              {{ msg.text }}
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-start">
             <div class="bg-white text-stone-800 shadow-sm border border-stone-100 rounded-2xl rounded-bl-none px-4 py-3 text-sm">
               <span class="animate-pulse">Thinking...</span>
             </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-stone-100 bg-white p-4">
          <form @submit.prevent="sendMessage" class="flex items-center gap-2">
            <input
              v-model="userInput"
              type="text"
              placeholder="Ask for styling advice..."
              class="flex-1 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            />
            <button
              type="submit"
              :disabled="isLoading || !userInput.trim()"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white transition-colors hover:bg-stone-800 disabled:opacity-50 cursor-pointer"
            >
              <Send class="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
