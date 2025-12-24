import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  delay?: number;
}

const variantStyles = {
  primary: {
    bg: 'bg-primary/10',
    iconBg: 'bg-primary',
    iconColor: 'text-primary-foreground',
    valueColor: 'text-primary',
  },
  secondary: {
    bg: 'bg-secondary/20',
    iconBg: 'bg-secondary',
    iconColor: 'text-secondary-foreground',
    valueColor: 'text-secondary-foreground',
  },
  accent: {
    bg: 'bg-accent/10',
    iconBg: 'bg-accent',
    iconColor: 'text-accent-foreground',
    valueColor: 'text-accent',
  },
  success: {
    bg: 'bg-success/10',
    iconBg: 'bg-success',
    iconColor: 'text-success-foreground',
    valueColor: 'text-success',
  },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'primary',
  delay = 0,
}) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`stat-card ${styles.bg} border border-border/50`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className={`text-3xl font-display font-bold ${styles.valueColor}`}>
            {value}
          </h3>
          {trend && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% from last month</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
