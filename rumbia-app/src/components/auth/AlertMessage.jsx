import { X, Check } from 'lucide-react';

const AlertMessage = ({ type = 'error', message }) => {
  if (!message) return null;

  const isError = type === 'error';
  const Icon = isError ? X : Check;
  const bgColor = isError ? 'bg-red-500/10' : 'bg-green-500/10';
  const borderColor = isError ? 'border-red-500/30' : 'border-green-500/30';
  const textColor = isError ? 'text-red-200' : 'text-green-200';
  const animation = isError ? 'animate-shake' : 'animate-pulse';

  return (
    <div className={`mb-6 p-4 ${bgColor} backdrop-blur-xl border ${borderColor} rounded-xl ${animation}`}>
      <p className={`${textColor} text-sm font-medium flex items-center gap-2`}>
        <Icon className="w-5 h-5" />
        {message}
      </p>
    </div>
  );
};

export default AlertMessage;