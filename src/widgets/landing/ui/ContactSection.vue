<script setup lang="ts">
import { ContactForm } from "~/features/contact-form";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";
</script>

<template>
  <section id="contact" class="scroll-mt-28 min-h-[78vh] py-8">
    <RevealOnScroll>
      <div class="flex justify-center">
        <div class="w-full max-w-3xl">
          <ContactForm initial-topic="Общая консультация" />
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
