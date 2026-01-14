import { Check, X } from "lucide-react";

interface FeatureItemProps {
  text: string;
  included: boolean;
}

export default function FeatureItem({ text, included }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-0.5 ${included ? 'text-[#d4af37]' : 'text-gray-600'}`}>
        {included ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </span>
      <span className={`text-sm ${included ? 'text-gray-300' : 'text-gray-600'}`}>
        {text}
      </span>
    </li>
  );
}
