# Implementación de CRUD de productos en DynamoDB con Express

El sistema permite a los administradores de inventario gestionar productos en una tienda online. Los productos tienen identificador, nombre, precio y stock. Los administradores pueden crear, leer, actualizar y eliminar productos. El sistema debe validar que el precio no sea negativo y que el nombre no esté duplicado. Ante un intento de crear o actualizar un producto con nombre duplicado, el sistema debe responder con un mensaje claro. En caso de stock cero, el producto debe mostrarse como agotado en las consultas.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de productos con Express y DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Creación de productos

**Objetivo:** Permitir la creación de nuevos productos en el inventario.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementa la funcionalidad para crear nuevos productos, asegurando que el precio no sea negativo y que el nombre no esté duplicado. Ante un intento de crear un producto con nombre duplicado, el sistema debe responder con un mensaje claro indicando el error.

**Entregable:** API REST que permite crear productos con validación de precio y nombre.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los errores de validación y cómo comunicarlos al usuario.
- Piensa en la estructura de datos necesaria para almacenar los productos.

</details>

### Fase 2: Consulta de productos

**Objetivo:** Permitir la consulta de productos por identificador y lista completa.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las funcionalidades para consultar productos por su identificador y para obtener la lista completa de productos. Asegúrate de que los productos con stock cero se marquen como agotados en las consultas.

**Entregable:** API REST que permite consultar productos por identificador y obtener la lista completa de productos, marcando aquellos con stock cero como agotados.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la respuesta para incluir información sobre el stock de los productos.
- Piensa en cómo optimizar las consultas para manejar un gran número de productos.

</details>

### Fase 3: Actualización y eliminación de productos

**Objetivo:** Permitir la actualización y eliminación de productos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementa las funcionalidades para actualizar y eliminar productos. Asegúrate de que las validaciones de precio y nombre se apliquen también en la actualización de productos.

**Entregable:** API REST que permite actualizar y eliminar productos, con validaciones de precio y nombre en la actualización.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los errores de validación en la actualización de productos.
- Piensa en la estrategia para eliminar productos de forma segura.

</details>

### Fase 4: Pruebas unitarias

**Objetivo:** Cubrir las funcionalidades implementadas con pruebas unitarias.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Escribe pruebas unitarias para cubrir las funcionalidades de creación, consulta, actualización y eliminación de productos. Asegúrate de que las pruebas verifiquen el comportamiento correcto de las validaciones y las respuestas de error.

**Entregable:** Conjunto de pruebas unitarias que cubren todas las funcionalidades implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo simular diferentes escenarios de entrada para probar las validaciones y las respuestas de error.
- Piensa en cómo estructurar las pruebas para que sean claras y mantenibles.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un producto en el contexto de este sistema y cuáles son sus atributos?
- **paraQueSirve**: ¿Para qué sirve validar el precio y el nombre de un producto al crearlo o actualizarlo?
- **comoSeUsa**: ¿Cómo se usa la API REST para crear, consultar, actualizar y eliminar productos?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al crear o actualizar un producto y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de las validaciones y las respuestas de error en las funcionalidades CRUD?

## Criterios de Evaluacion

- Implementación correcta de la funcionalidad para crear productos con validación de precio y nombre.
- Implementación correcta de la funcionalidad para consultar productos por identificador y obtener la lista completa de productos.
- Implementación correcta de la funcionalidad para actualizar productos con validación de precio y nombre.
- Implementación correcta de la funcionalidad para eliminar productos.
- Escrituras de pruebas unitarias que cubren todas las funcionalidades implementadas.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:productId`
  - `GET /products`
  - `PUT /products/:productId`
  - `DELETE /products/:productId`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
