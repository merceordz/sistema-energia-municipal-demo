import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Plus, FileText, Zap, Building, TrendingUp, Settings } from 'lucide-react';

const MunicipalEnergyApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [facturas, setFacturas] = useState([
    // Datos de ejemplo más realistas - Municipio San Rafael, Mendoza
    { id: 1, fecha: '2024-01', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 2800, costo: 142000, empresa: 'EDEMSA' },
    { id: 2, fecha: '2024-01', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 5200, costo: 268000, empresa: 'EDEMSA' },
    { id: 3, fecha: '2024-01', dependencias: ['Centro Cultural'], tipo: 'electricidad', consumo: 1800, costo: 95000, empresa: 'EDEMSA' },
    { id: 4, fecha: '2024-01', dependencias: ['Palacio Municipal'], tipo: 'gas', consumo: 950, costo: 48000, empresa: 'Distribuidora de Gas Cuyana' },
    { id: 5, fecha: '2024-02', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 2400, costo: 125000, empresa: 'EDEMSA' },
    { id: 6, fecha: '2024-02', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 4800, costo: 248000, empresa: 'EDEMSA' },
    { id: 7, fecha: '2024-02', dependencias: ['Centro Cultural'], tipo: 'electricidad', consumo: 1600, costo: 85000, empresa: 'EDEMSA' },
    { id: 8, fecha: '2024-03', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 2200, costo: 118000, empresa: 'EDEMSA' },
    { id: 9, fecha: '2024-03', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 4500, costo: 235000, empresa: 'EDEMSA' },
    { id: 10, fecha: '2024-03', dependencias: ['Centro Cultural'], tipo: 'electricidad', consumo: 1500, costo: 82000, empresa: 'EDEMSA' },
    { id: 11, fecha: '2024-04', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 2600, costo: 138000, empresa: 'EDEMSA' },
    { id: 12, fecha: '2024-04', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 4900, costo: 258000, empresa: 'EDEMSA' },
    // Temporada de calefacción
    { id: 13, fecha: '2024-05', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 3200, costo: 168000, empresa: 'EDEMSA' },
    { id: 14, fecha: '2024-05', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 5800, costo: 298000, empresa: 'EDEMSA' },
    { id: 15, fecha: '2024-05', dependencias: ['Palacio Municipal'], tipo: 'gas', consumo: 1400, costo: 72000, empresa: 'Distribuidora de Gas Cuyana' },
    { id: 16, fecha: '2024-06', dependencias: ['Palacio Municipal', 'Biblioteca Central'], tipo: 'electricidad', consumo: 3800, costo: 195000, empresa: 'EDEMSA' },
    { id: 17, fecha: '2024-06', dependencias: ['Hospital Municipal'], tipo: 'electricidad', consumo: 6200, costo: 318000, empresa: 'EDEMSA' },
    { id: 18, fecha: '2024-06', dependencias: ['Palacio Municipal'], tipo: 'gas', consumo: 1800, costo: 88000, empresa: 'Distribuidora de Gas Cuyana' }
  ]);

  const [equipos, setEquipos] = useState([
    // Palacio Municipal
    { id: 1, dependencia: 'Palacio Municipal', categoria: 'Climatización', tipo: 'Aire Acondicionado Split 3500W', cantidad: 15, potencia: 3500, horasUso: 8, diasSemana: 5 },
    { id: 2, dependencia: 'Palacio Municipal', categoria: 'Iluminación', tipo: 'Tubos Fluorescentes 36W', cantidad: 120, potencia: 36, horasUso: 10, diasSemana: 5 },
    { id: 3, dependencia: 'Palacio Municipal', categoria: 'Equipos de Oficina', tipo: 'Computadoras de Escritorio', cantidad: 45, potencia: 300, horasUso: 8, diasSemana: 5 },
    { id: 4, dependencia: 'Palacio Municipal', categoria: 'Equipos de Oficina', tipo: 'Impresoras Multifunción', cantidad: 8, potencia: 500, horasUso: 4, diasSemana: 5 },
    { id: 5, dependencia: 'Palacio Municipal', categoria: 'Climatización', tipo: 'Calefactores Eléctricos', cantidad: 20, potencia: 2000, horasUso: 6, diasSemana: 5 },
    
    // Hospital Municipal  
    { id: 6, dependencia: 'Hospital Municipal', categoria: 'Climatización', tipo: 'Aire Acondicionado Central', cantidad: 3, potencia: 18000, horasUso: 24, diasSemana: 7 },
    { id: 7, dependencia: 'Hospital Municipal', categoria: 'Equipos Médicos', tipo: 'Equipos de Diagnóstico', cantidad: 1, potencia: 12000, horasUso: 16, diasSemana: 7 },
    { id: 8, dependencia: 'Hospital Municipal', categoria: 'Iluminación', tipo: 'Iluminación LED Hospitalaria', cantidad: 200, potencia: 18, horasUso: 24, diasSemana: 7 },
    { id: 9, dependencia: 'Hospital Municipal', categoria: 'Equipos Médicos', tipo: 'Refrigeración Médica', cantidad: 8, potencia: 800, horasUso: 24, diasSemana: 7 },
    
    // Biblioteca Central
    { id: 10, dependencia: 'Biblioteca Central', categoria: 'Iluminación', tipo: 'Lámparas LED 15W', cantidad: 80, potencia: 15, horasUso: 12, diasSemana: 6 },
    { id: 11, dependencia: 'Biblioteca Central', categoria: 'Climatización', tipo: 'Aire Acondicionado Split', cantidad: 6, potencia: 3000, horasUso: 10, diasSemana: 6 },
    { id: 12, dependencia: 'Biblioteca Central', categoria: 'Equipos de Oficina', tipo: 'Computadoras Públicas', cantidad: 20, potencia: 250, horasUso: 8, diasSemana: 6 },
    
    // Centro Cultural
    { id: 13, dependencia: 'Centro Cultural', categoria: 'Iluminación', tipo: 'Iluminación Escénica LED', cantidad: 40, potencia: 50, horasUso: 6, diasSemana: 4 },
    { id: 14, dependencia: 'Centro Cultural', categoria: 'Climatización', tipo: 'Aire Acondicionado Split', cantidad: 8, potencia: 4500, horasUso: 8, diasSemana: 4 },
    { id: 15, dependencia: 'Centro Cultural', categoria: 'Equipos de Oficina', tipo: 'Equipos de Audio y Video', cantidad: 1, potencia: 3000, horasUso: 4, diasSemana: 4 }
  ]);

  const [newFactura, setNewFactura] = useState({
    fecha: '',
    dependencias: [],
    tipo: 'electricidad',
    consumo: '',
    costo: '',
    empresa: ''
  });

  const [newEquipo, setNewEquipo] = useState({
    dependencia: '',
    categoria: '',
    tipo: '',
    cantidad: '',
    potencia: '',
    horasUso: '',
    diasSemana: ''
  });

  // Factores de emisión para Argentina (kg CO2/unidad)
  const factoresEmision = {
    electricidad: 0.408, // kg CO2/kWh (Sistema Eléctrico Nacional Argentina)
    gas: 2.04 // kg CO2/m³ (Gas Natural)
  };

  // Cálculos para dashboard
  const getDependenciaStats = () => {
    const stats = {};
    facturas.forEach(factura => {
      factura.dependencias.forEach(dep => {
        if (!stats[dep]) {
          stats[dep] = { consumoElectricidad: 0, consumoGas: 0, costoTotal: 0 };
        }
        const costoProporcionado = factura.costo / factura.dependencias.length;
        const consumoProporcionado = factura.consumo / factura.dependencias.length;
        
        if (factura.tipo === 'electricidad') {
          stats[dep].consumoElectricidad += consumoProporcionado;
        } else {
          stats[dep].consumoGas += consumoProporcionado;
        }
        stats[dep].costoTotal += costoProporcionado;
      });
    });
    
    return Object.entries(stats).map(([dep, data]) => ({
      dependencia: dep,
      ...data,
      consumoTotal: data.consumoElectricidad + data.consumoGas,
      emisionesCO2: (data.consumoElectricidad * factoresEmision.electricidad) + (data.consumoGas * factoresEmision.gas)
    })).sort((a, b) => b.consumoTotal - a.consumoTotal);
  };

  const getEstacionalidad = () => {
    const meses = {};
    facturas.forEach(factura => {
      const mes = factura.fecha;
      if (!meses[mes]) {
        meses[mes] = { mes, electricidad: 0, gas: 0 };
      }
      if (factura.tipo === 'electricidad') {
        meses[mes].electricidad += factura.consumo;
      } else {
        meses[mes].gas += factura.consumo;
      }
    });
    
    return Object.values(meses).sort((a, b) => a.mes.localeCompare(b.mes));
  };

  const getEquipoStats = (dependenciaSeleccionada) => {
    const equiposDep = equipos.filter(eq => eq.dependencia === dependenciaSeleccionada);
    return equiposDep.map(eq => {
      const consumoMensual = (eq.cantidad * eq.potencia * eq.horasUso * eq.diasSemana * 4.33) / 1000; // kWh mensuales
      return {
        ...eq,
        consumoMensual,
        costoEstimado: consumoMensual * 50 // Estimación $50/kWh
      };
    }).sort((a, b) => b.consumoMensual - a.consumoMensual);
  };

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleAddFactura = () => {
    if (newFactura.fecha && newFactura.dependencias.length > 0 && newFactura.consumo && newFactura.costo) {
      setFacturas([...facturas, {
        id: Date.now(),
        ...newFactura,
        consumo: parseFloat(newFactura.consumo),
        costo: parseFloat(newFactura.costo)
      }]);
      setNewFactura({
        fecha: '',
        dependencias: [],
        tipo: 'electricidad',
        consumo: '',
        costo: '',
        empresa: ''
      });
    }
  };

  const handleAddEquipo = () => {
    if (newEquipo.dependencia && newEquipo.tipo && newEquipo.cantidad && newEquipo.potencia) {
      setEquipos([...equipos, {
        id: Date.now(),
        ...newEquipo,
        cantidad: parseInt(newEquipo.cantidad),
        potencia: parseFloat(newEquipo.potencia),
        horasUso: parseFloat(newEquipo.horasUso),
        diasSemana: parseInt(newEquipo.diasSemana)
      }]);
      setNewEquipo({
        dependencia: '',
        categoria: '',
        tipo: '',
        cantidad: '',
        potencia: '',
        horasUso: '',
        diasSemana: ''
      });
    }
  };

  const getTotalEmisiones = () => {
    return facturas.reduce((total, factura) => {
      return total + (factura.consumo * factoresEmision[factura.tipo]);
    }, 0);
  };

  const dependenciasUnicas = [...new Set(facturas.flatMap(f => f.dependencias))];
  const dependenciaStats = getDependenciaStats();
  const estacionalidadData = getEstacionalidad();
  const totalEmisiones = getTotalEmisiones();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Sistema de Gestión Energética Municipal</h1>
        <p className="text-blue-100">Diagnóstico y análisis de consumo energético para municipios argentinos</p>
        <div className="mt-4 bg-blue-800 bg-opacity-50 p-3 rounded-lg">
          <p className="text-sm text-blue-100">
            <span className="font-semibold">DEMO</span> - Datos de ejemplo del Municipio de San Rafael, Mendoza
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
              { id: 'facturas', name: 'Facturas', icon: FileText },
              { id: 'equipos', name: 'Inventario de Equipos', icon: Zap }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Building className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dependencias</p>
                    <p className="text-2xl font-bold text-gray-900">{dependenciasUnicas.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Consumo Total (kWh)</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {facturas.reduce((acc, f) => acc + f.consumo, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Costo Total ($)</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${facturas.reduce((acc, f) => acc + f.costo, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="h-8 w-8 text-red-500 mr-3 flex items-center justify-center bg-red-50 rounded">
                    <span className="text-sm font-bold">CO₂</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Emisiones CO₂</p>
                    <p className="text-2xl font-bold text-gray-900">{totalEmisiones.toFixed(0)} kg</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Equipos Registrados</p>
                    <p className="text-2xl font-bold text-gray-900">{equipos.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos principales */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ranking de dependencias */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Consumo por Dependencia</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dependenciaStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dependencia" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} kWh`, 'Consumo']} />
                    <Bar dataKey="consumoTotal" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Emisiones CO2 por dependencia */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Emisiones CO₂ por Dependencia</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dependenciaStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dependencia" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toFixed(0)} kg CO₂`, 'Emisiones']} />
                    <Bar dataKey="emisionesCO2" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Estacionalidad */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Estacionalidad del Consumo</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={estacionalidadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="electricidad" stroke="#3B82F6" name="Electricidad (kWh)" />
                    <Line type="monotone" dataKey="gas" stroke="#EF4444" name="Gas (m³)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Análisis por dependencia */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Análisis de Equipos por Dependencia</h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {dependenciasUnicas.map(dep => {
                  const equiposDep = getEquipoStats(dep);
                  return (
                    <div key={dep} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{dep}</h4>
                      {equiposDep.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={equiposDep.map((eq, idx) => ({
                                name: eq.categoria,
                                value: eq.consumoMensual,
                                fill: colors[idx % colors.length]
                              }))}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              dataKey="value"
                            />
                            <Tooltip formatter={(value) => [`${value.toFixed(0)} kWh/mes`, 'Consumo']} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-gray-500 text-sm">No hay equipos registrados</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facturas' && (
          <div className="space-y-6">
            {/* Form para agregar factura */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Agregar Nueva Factura</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha (YYYY-MM)</label>
                  <input
                    type="text"
                    placeholder="2024-01"
                    value={newFactura.fecha}
                    onChange={(e) => setNewFactura({...newFactura, fecha: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
                  <select
                    value={newFactura.tipo}
                    onChange={(e) => setNewFactura({...newFactura, tipo: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="electricidad">Electricidad</option>
                    <option value="gas">Gas Natural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <input
                    type="text"
                    placeholder="EDEMSA, Distribuidora de Gas Cuyana, etc."
                    value={newFactura.empresa}
                    onChange={(e) => setNewFactura({...newFactura, empresa: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consumo (kWh o m³)</label>
                  <input
                    type="number"
                    value={newFactura.consumo}
                    onChange={(e) => setNewFactura({...newFactura, consumo: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Costo ($)</label>
                  <input
                    type="number"
                    value={newFactura.costo}
                    onChange={(e) => setNewFactura({...newFactura, costo: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dependencias (separar con comas)</label>
                  <input
                    type="text"
                    placeholder="Palacio Municipal, Biblioteca Central"
                    value={newFactura.dependencias.join(', ')}
                    onChange={(e) => setNewFactura({...newFactura, dependencias: e.target.value.split(',').map(d => d.trim()).filter(d => d)})}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
              <button
                onClick={handleAddFactura}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Factura
              </button>
            </div>

            {/* Lista de facturas */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold">Facturas Registradas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dependencias</th>
