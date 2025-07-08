import React, { useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { toast } from 'react-toastify';

function ContactForm() {
  const [state, handleSubmit] = useForm("xblypvjv");

  useEffect(() => {
    if (state.succeeded) {
      toast.success('Mensaje enviado correctamente');
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return <div className="alert alert-success mt-4">¡Gracias por tu mensaje!</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="form-control"
            required
          />
          <ValidationError prefix="Mensaje" field="message" errors={state.errors} />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.submitting}
        >
          {state.submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
