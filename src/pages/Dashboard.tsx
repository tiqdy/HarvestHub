import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Users,
  Wheat,
  MapPin,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import {
  transaksiData,
  petaniData,
  komoditasData,
  lahanData,
  getFullTransaksiReport,
  formatCurrency,
  formatDate,
} from '@/data/mockData';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const fullReport = getFullTransaksiReport();

  // Calculate totals
  const totalRevenue = fullReport.reduce((sum, t) => sum + t.subtotal, 0);

  // Monthly data for chart
  const monthlyData = [
    { month: 'Nov 1-10', transactions: 4, revenue: 11700000 },
    { month: 'Nov 11-15', transactions: 5, revenue: 11650000 },
    { month: 'Nov 16-20', transactions: 5, revenue: 10600000 },
    { month: 'Nov 21-25', transactions: 5, revenue: 8420000 },
  ];

  // Commodity distribution
  const commodityDistribution = komoditasData.map((k) => {
    const total = fullReport
      .filter((t) => t.namaKomoditas === k.namaKomoditas)
      .reduce((sum, t) => sum + t.berat, 0);
    return { name: k.namaKomoditas, value: total };
  });

  const COLORS = [
    'hsl(142, 35%, 28%)',
    'hsl(42, 75%, 55%)',
    'hsl(28, 85%, 55%)',
    'hsl(200, 70%, 50%)',
    'hsl(142, 50%, 40%)',
    'hsl(30, 60%, 45%)',
  ];

  // Recent transactions
  const recentTransactions = fullReport.slice(-5).reverse();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your agricultural operations"
        action={
          <Button onClick={() => navigate('/transactions/new')} className="btn-harvest gap-2">
            <ClipboardList className="w-4 h-4" />
            New Transaction
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Transactions"
          value={transaksiData.length}
          icon={ClipboardList}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatCard
          title="Registered Farmers"
          value={petaniData.length}
          icon={Users}
          variant="success"
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <StatCard
          title="Commodities"
          value={komoditasData.length}
          icon={Wheat}
          variant="secondary"
          delay={0.2}
        />
        <StatCard
          title="Land Areas"
          value={lahanData.length}
          icon={MapPin}
          variant="accent"
          delay={0.3}
        />
      </div>

      {/* Revenue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-harvest p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h2 className="text-4xl font-display font-bold text-foreground">
              {formatCurrency(totalRevenue)}
            </h2>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-success" />
          </div>
        </div>
        <p className="text-sm text-success flex items-center gap-1">
          <span>↑ 15.3%</span>
          <span className="text-muted-foreground">from previous period</span>
        </p>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Transactions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-harvest p-6"
        >
          <h3 className="font-display text-lg font-semibold mb-6">Transaction Trends</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar
                dataKey="transactions"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                name="Transactions"
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Commodity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-harvest p-6"
        >
          <h3 className="font-display text-lg font-semibold mb-6">Commodity Distribution (kg)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={commodityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {commodityDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value} kg`, 'Weight']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {commodityDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-harvest overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Recent Transactions</h3>
          <Button
            variant="ghost"
            onClick={() => navigate('/transactions')}
            className="text-primary hover:text-primary/80 gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-harvest">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Farmer</th>
                <th>Commodity</th>
                <th>Weight</th>
                <th className="text-right pr-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr
                  key={`${t.noTransaksi}-${t.namaKomoditas}`}
                  className="cursor-pointer"
                  onClick={() => navigate(`/transactions/${t.noTransaksi}`)}
                >
                  <td className="font-medium text-primary">{t.noTransaksi}</td>
                  <td className="text-muted-foreground">{formatDate(t.tanggal)}</td>
                  <td>{t.namaPetani}</td>
                  <td>
                    <span className="badge-success">{t.namaKomoditas}</span>
                  </td>
                  <td>{t.berat.toLocaleString()} kg</td>
                  <td className="text-right font-medium">{formatCurrency(t.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
