# WebServerSOAP-ELF

Se desarrolló una página web utilizando la arquitectura cliente-servidor. En términos generales, se implementó un sistema CRUD (Crear, Leer, Actualizar, Eliminar) destinado a gestionar información sobre empleados. Cada entidad de empleado incluye campos como el ID, nombre, correo electrónico, departamento y rol.
En el lado del cliente, se utiliza Next.js con Typescript, una combinación que ofrece un desarrollo rápido y robusto de interfaces de usuario, aprovechando las ventajas de la tipificación estática. Mientras tanto, en el lado del servidor, se empleó Spring Boot junto con Java, una combinación ampliamente utilizada en el desarrollo de aplicaciones empresariales, que proporciona un marco sólido para la construcción de servicios RESTful y aplicaciones web escalables.
Para la comunicación entre el cliente y el servidor, se eligió el protocolo SOAP (Simple Object Access Protocol), conocido por su capacidad para facilitar la interoperabilidad entre diferentes sistemas a través de la definición de interfaces basadas en estándares XML. Esto permite una comunicación estructurada y segura entre los componentes cliente y servidor.
En cuanto a la gestión de datos, se seleccionó MongoDB Atlas como la solución de base de datos. MongoDB Atlas es una base de datos NoSQL en la nube, que ofrece escalabilidad, flexibilidad y alta disponibilidad para almacenar y gestionar datos de forma eficiente.


## Ejecución del cliente

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First:
cd client
npm install -g next

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Ejecución del servidor

First, add to application.preperties the uri to mongoDB
cd server
mvn clean
mvn compile
mvn spring-boot:run