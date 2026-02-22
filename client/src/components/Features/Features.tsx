import { useMemo } from "react";

interface FeaturesProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Features = (featureProp: FeaturesProps) => {
    // Destructure props
    const { icon, title, description } = featureProp;
    // Wrapper classes for the feature card
    const wrapperClasses = useMemo(() => {
        return "text-center p-8 rounded-2xl bg-white dark:bg-[#111127] border border-gray-100 dark:border-brand-navy-light hover:shadow-xl hover:border-brand-yellow dark:hover:border-brand-yellow transition-all duration-300";
    }, []);
    // Icon wrapper classes
    const iconWrapperClasses = useMemo(() => {
        return "w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-brand-yellow/15 dark:bg-brand-yellow/20 text-brand-yellow";
    }, []);
    // Title classes
    const titleClasses = useMemo(() => {
        return "text-xl font-semibold text-brand-navy dark:text-white";
    }, []);
    // Description classes
    const descriptionClasses = useMemo(() => {
        return "mt-3 text-brand-gray dark:text-gray-400 leading-relaxed";
    }, []);


    return (
        <div className={wrapperClasses}>
            <div className={iconWrapperClasses}>
                {icon}
            </div>
            <h3 className={titleClasses}>
              {title}
            </h3>
            <p className={descriptionClasses}>
              {description}
            </p>
            </div>
    );
}

export default Features;