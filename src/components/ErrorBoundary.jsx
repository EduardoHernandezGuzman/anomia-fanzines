import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex flex-col justify-center items-center h-[85vh] px-4 py-24">
        <h1 className="text-gray-800 font-bold text-2xl mb-4 text-center">Algo ha salido mal.</h1>
        <p className="text-gray-700 mb-8 text-center">
          Ha ocurrido un error inesperado. Recarga la página para continuar tu exploración.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full cursor-pointer transition-colors duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600/50"
        >
          Recargar página
        </button>
      </div>
    );
  }
}
