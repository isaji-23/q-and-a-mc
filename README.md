# Asistente de Minecraft – Base de conocimiento y optimizaciones

## URL de despliegue

> [!IMPORTANT]
> **URL de la aplicación web:**  
> *[https://q-and-a-mc.vercel.app/](https://q-and-a-mc.vercel.app/)*

---

## Índice

1. [Documento o referencia a las preguntas y respuestas utilizadas](#1-documento-o-referencia-a-las-preguntas-y-respuestas-utilizadas)
2. [Ejemplos de preguntas realizadas al sistema y respuestas obtenidas](#2-ejemplos-de-preguntas-realizadas-al-sistema-y-respuestas-obtenidas)
3. [Optimizaciones introducidas para mejorar el rendimiento](#3-optimizaciones-introducidas-para-mejorar-el-rendimiento)
4. [Conclusión](#conclusión)

## 1. Documento o referencia a las preguntas y respuestas utilizadas

La base de conocimiento utilizada para construir el **Asistente de Minecraft (modo supervivencia para principiantes)** se compone de un conjunto curado de preguntas y respuestas centradas en las mecánicas básicas del juego.

### Origen del contenido

El contenido se ha generado a partir de:

* Un dataset público de preguntas y respuestas basado en contenido de la Minecraft Wiki. [https://huggingface.co/datasets/naklecha/minecraft-question-answer-700k](https://huggingface.co/datasets/naklecha/minecraft-question-answer-700k)
* Información oficial y ampliamente documentada sobre las mecánicas de supervivencia del juego para añadir algunas preguntas más generales.

A partir de este conjunto original, que contenía varios cientos de miles de entradas, se realizó un proceso de filtrado y selección para obtener un subconjunto reducido y de mayor calidad, orientado específicamente a jugadores principiantes.

### Formato de la base de conocimiento

La base de conocimiento final se almacenó en un archivo de texto plano (`.txt`) siguiendo el formato recomendado por **Azure AI Language - Custom Question Answering**:

```
Q: Texto de la pregunta
A: Texto de la respuesta
```

Este formato permite al servicio identificar correctamente cada par pregunta–respuesta durante el proceso de indexación.

### Archivo utilizado

* `minecraft_qa_faq.txt`
* Aproximadamente 1200 pares de preguntas y respuestas
* Idioma: inglés
* Temática: Minecraft – Supervivencia para principiantes

---

## 2. Ejemplos de preguntas realizadas al sistema y respuestas obtenidas

A continuación se muestran algunos ejemplos de consultas realizadas al sistema y las respuestas obtenidas.

### Ejemplo 1

**Pregunta:**
How do you survive the first night in Minecraft?

**Respuesta:**
To survive the first night, gather wood, craft basic tools, build a simple shelter, place torches, and avoid hostile mobs until daylight or sleep in a bed.

---

### Ejemplo 2

**Pregunta:**
How does hunger work in Minecraft?

**Respuesta:**
Hunger decreases when performing actions like running or fighting. When the hunger bar is full, the player regenerates health automatically. If it reaches zero, the player starts losing health.

---

### Ejemplo 3

**Pregunta:**
How do you craft basic tools in Minecraft?

**Respuesta:**
Basic tools are crafted using a crafting table. Wooden planks and sticks are combined to create tools such as a pickaxe, axe, shovel, and sword.

---

### Ejemplo 4

**Pregunta:**
How do you start mining in Minecraft?

**Respuesta:**
To start mining, craft a pickaxe and dig underground to find resources like coal and iron. Mining in caves or digging a staircase downward is safer than digging straight down.

---

### Ejemplo 5

**Pregunta:**
What food is good for beginners?

**Respuesta:**
Bread, cooked meat, and apples are good food options for beginners because they are easy to obtain and restore hunger effectively.

---

## 3. Optimizaciones introducidas para mejorar el rendimiento

Durante el desarrollo del sistema se aplicaron varias optimizaciones para mejorar tanto el rendimiento como la calidad de las respuestas.

### Reducción del dataset

El dataset original contenía cientos de miles de preguntas y respuestas. Para mejorar el rendimiento y reducir el ruido, se redujo a un subconjunto de aproximadamente 1200 preguntas cuidadosamente seleccionadas.

Esta reducción permitió:

* Disminuir el tiempo de indexación.
* Reducir la latencia en las respuestas.
* Aumentar la relevancia de los resultados.

---

### Filtrado y puntuación por relevancia

Antes de generar la base de conocimiento final, se aplicó un filtrado basado en:

* Palabras clave relacionadas con la supervivencia.
* Mecánicas básicas orientadas a principiantes.
* Longitud adecuada de las preguntas.

Además, se utilizó un sistema de puntuación para priorizar temas clave como:

* la primera noche
* el hambre y la comida
* las herramientas básicas
* la minería inicial
* los mobs hostiles

---

### Filtrado por longitud de las preguntas

Se eliminaron preguntas demasiado cortas o excesivamente largas para garantizar:

* una mejor comprensión semántica
* una detección más clara de la intención del usuario
* una mayor precisión en la correspondencia pregunta–respuesta

---

### Uso de preguntas de seguimiento (follow-up prompts)

Se añadieron preguntas de seguimiento a algunas preguntas clave del sistema. Estas preguntas enlazan con otras ya existentes en la base de conocimiento y permiten guiar al usuario de forma progresiva a través de los conceptos básicos del juego.

Esta funcionalidad mejora la experiencia de usuario sin duplicar información.

---

## Conclusión

Gracias a una base de conocimiento curada, un formato estructurado y diversas optimizaciones, el Asistente de Minecraft ofrece respuestas precisas, rápidas y orientadas a jugadores principiantes, manteniendo un rendimiento eficiente dentro del servicio Azure AI Language – Custom Question Answering.
