import React, { useState } from 'react';
import { Calendar, Clock, Users, CreditCard, DollarSign } from 'lucide-react';

function App() {
  const [selectedDays, setSelectedDays] = useState(0);
  const [participants, setParticipants] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Calendario de Diciembre 2024 y Enero 2025
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </header>

        {/* Calendar Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Calendario</h2>
          </div>
          <div className="calendar-container">
            {/* Calendar content */}
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Método de Pago</h2>
          </div>
          <select 
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Seleccione una opción</option>
            <option value="credit-card">Tarjeta de crédito</option>
            <option value="cash">Efectivo</option>
          </select>
        </section>

        {/* Participants */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Participantes</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <select 
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500" />
                <span>Extender descuento a 1 primo</span>
              </label>
            </div>
          </div>
        </section>

        {/* Schedule Selection */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Horarios</h2>
          </div>
          <div className="space-y-4">
            {['8am', '2pm', '3pm'].map(time => (
              <div key={time} className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500" />
                  <span>{time}</span>
                </label>
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="checkbox" className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500" disabled />
                  <span>PixelArt</span>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Totals */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Resumen</h2>
          </div>
          <div className="space-y-2">
            <p className="text-lg">Días Seleccionados: <span className="font-semibold">{selectedDays}</span></p>
            <p className="text-lg">Horario Regular: <span className="font-semibold">$0.00</span></p>
            <p className="text-lg">Horario Extra: <span className="font-semibold">$0.00</span></p>
            <div className="h-px bg-gray-200 my-4" />
            <p className="text-xl font-bold text-purple-600">Total a Pagar: $0.00</p>
          </div>
        </section>

        {/* Admin Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Contraseña de administrador"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => setShowPricing(true)}
            >
              Log In
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;