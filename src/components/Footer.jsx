export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div>
            <h3 className="text-xl font-medium tracking-tight mb-2">
              SECOND<span className="text-secondary">OPERATOR</span>
            </h3>
            <p className="text-secondary text-sm mb-1">AI coworkers for growing businesses.</p>
            <p className="text-secondary text-sm">Let humans be humans. Let machines do the work.</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-white text-sm mb-4">Every human deserves a Second Operator.</p>
            <p className="text-secondary text-xs">© 2026 Second Operator</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
