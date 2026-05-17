import { TrendingUp, Users, DollarSign, Ticket, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RePieChart, Pie, Cell } from 'recharts';

export function AdminDashboard() {
  const salesData = [
    { month: 'Jan', value: 45000 },
    { month: 'Fev', value: 52000 },
    { month: 'Mar', value: 61000 },
    { month: 'Abr', value: 58000 },
    { month: 'Mai', value: 71000 },
    { month: 'Jun', value: 95000 },
  ];

  const categoryData = [
    { name: 'VIP', value: 15000, color: '#9333ea' },
    { name: 'Premium', value: 35000, color: '#1E7F43' },
    { name: 'Superior', value: 45000, color: '#3b82f6' },
    { name: 'Inferior', value: 55000, color: '#10b981' },
  ];

  const stats = [
    {
      icon: DollarSign,
      label: 'Receita Total',
      value: 'R$ 2.847.500',
      change: '+23.5%',
      positive: true,
      color: 'bg-green-500'
    },
    {
      icon: Ticket,
      label: 'Ingressos Vendidos',
      value: '12.847',
      change: '+18.2%',
      positive: true,
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      label: 'Clientes Únicos',
      value: '8.234',
      change: '+12.8%',
      positive: true,
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Ocupação',
      value: '87.3%',
      change: '+5.4%',
      positive: true,
      color: 'bg-primary'
    },
  ];

  const upcomingMatches = [
    { match: 'Brasil vs Argentina', date: '24 Jun', sold: 68234, total: 78838, percentage: 87 },
    { match: 'Alemanha vs França', date: '25 Jun', sold: 52100, total: 66822, percentage: 78 },
    { match: 'Espanha vs Portugal', date: '22 Jun', sold: 41200, total: 50000, percentage: 82 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-1">Dashboard Admin</h1>
              <p className="text-gray-600">Gestão de Ingressos - Copa do Mundo 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">⚽</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="mb-1">Receita Mensal</h2>
                  <p className="text-sm text-gray-600">Evolução das vendas por mês</p>
                </div>
                <BarChart3 className="w-6 h-6 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                  <Bar dataKey="value" fill="#1E7F43" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="mb-1">Vendas por Categoria</h2>
                  <p className="text-sm text-gray-600">Distribuição</p>
                </div>
                <PieChart className="w-6 h-6 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="mb-1">Próximas Partidas</h2>
                <p className="text-sm text-gray-600">Gerenciamento de disponibilidade</p>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90">
                Ver Todas
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Partida</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Data</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Vendidos</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Capacidade</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Ocupação</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMatches.map((match, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium">{match.match}</td>
                      <td className="py-4 px-4 text-gray-600">{match.date}</td>
                      <td className="py-4 px-4">{match.sold.toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-600">{match.total.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${match.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm">{match.percentage}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-lg text-sm ${
                          match.percentage >= 85
                            ? 'bg-red-100 text-red-700'
                            : match.percentage >= 70
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {match.percentage >= 85 ? 'Quase Esgotado' : match.percentage >= 70 ? 'Vendendo' : 'Disponível'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
