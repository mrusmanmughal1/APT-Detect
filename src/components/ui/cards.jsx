// Replace the Card imports with simple styled divs
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white p-4 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`pt-4 ${className}`}>{children}</div>
);