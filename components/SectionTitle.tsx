interface SectionTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
    return (
        <div className={`text-center mb-12 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-wider text-gray-900 mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm md:text-base font-sans tracking-widest text-gray-500 uppercase">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
