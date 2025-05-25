import { getDomain } from "@/lib/utils";

interface PreviewSectionProps {
  preview: {
    title: string;
    description: string;
    url: string;
    image: string | null;
  };
}

export default function PreviewSection({ preview }: PreviewSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-white mb-4 sm:mb-6">
        Social Media Previews
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Google Search Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
              Google Search Preview
            </h4>
          </div>
          <div className="p-3 sm:p-4 dark:bg-slate-800">
            <div className="max-w-2xl">
              <div className="text-base sm:text-lg text-blue-800 dark:text-blue-400 hover:underline cursor-pointer truncate">
                {preview.title || "Title not available"}
              </div>
              <div className="text-xs sm:text-sm text-green-700 dark:text-green-500 truncate">
                {preview.url || "URL not available"}
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                {preview.description || "Description not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Facebook Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
              Facebook Preview
            </h4>
          </div>
          <div className="p-3 sm:p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-28 sm:h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3 bg-white dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 text-xs uppercase">
                  {getDomain(preview.url) || "website.com"}
                </div>
                <div className="font-medium text-slate-900 dark:text-white mt-0.5 sm:mt-1 text-sm sm:text-base">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5 sm:mt-1 line-clamp-2">
                  {preview.description || "Description not available"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
              Twitter Card Preview
            </h4>
          </div>
          <div className="p-3 sm:p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-28 sm:h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3 bg-white dark:bg-slate-800">
                <div className="font-medium text-slate-900 dark:text-white text-sm sm:text-base">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5 sm:mt-1 line-clamp-2">
                  {preview.description || "Description not available"}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1 sm:mt-2">
                  {getDomain(preview.url) || "website.com"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-3 sm:px-4 py-2 sm:py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
              LinkedIn Preview
            </h4>
          </div>
          <div className="p-3 sm:p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-28 sm:h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3 bg-white dark:bg-slate-800">
                <div className="font-medium text-slate-900 dark:text-white text-sm sm:text-base">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 sm:mt-1">
                  {getDomain(preview.url) || "website.com"}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5 sm:mt-1 line-clamp-2">
                  {preview.description || "Description not available"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
