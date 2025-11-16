import React from 'react';
// 1. Usamos la sintaxis moderna de React 18
import { createRoot } from 'react-dom/client'; 
// 2. Todos los componentes de Apollo, incluido ApolloProvider, vienen de @apollo/client
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// 3. Definición del Endpoint
// Usamos '/graphql' porque Webpack Dev Server (en puerto 3000) lo redirige a localhost:4000
const client = new ApolloClient({
  uri: '/graphql', 
  cache: new InMemoryCache(),
});

// 4. Consulta GraphQL de Prueba
// Asegúrate de que tu Backend tenga un campo 'hello' o cámbialo a algo que sí exista
const HELLO_QUERY = gql`
  query GetHello {
    hello
  }
`;

// 5. Componente Principal
function App() {
  // Hook de Apollo para ejecutar la consulta
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p className="text-blue-500">Cargando datos del servidor...</p>;
  
  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <p className="text-red-600 font-semibold">
        Error al conectar con GraphQL: {error.message}
      </p>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-10 text-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Conexión GraphQL Exitosa
      </h1>
      
      <p className="text-gray-600 mb-2">
        Respuesta del campo 'hello' del Backend:
      </p>
      
      <div className="bg-gray-100 p-4 rounded-lg font-mono text-left">
        {data ? JSON.stringify(data.hello) : 'No se recibieron datos.'}
      </div>
    </div>
  );
}

// 6. Renderizado de la Aplicación con React 18
const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
}
