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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6">
        Preview
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Search Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="font-medium text-slate-800 dark:text-slate-200">
              Google Search Preview
            </h4>
          </div>
          <div className="p-4 dark:bg-slate-800">
            <div className="max-w-2xl">
              <div className="text-xl text-blue-800 dark:text-blue-400 hover:underline cursor-pointer truncate">
                {preview.title || "Title not available"}
              </div>
              <div className="text-sm text-green-700 dark:text-green-500 truncate">
                {preview.url || "URL not available"}
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                {preview.description || "Description not available"}
              </div>
            </div>
          </div>
        </div>

        {/* Facebook Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="font-medium text-slate-800 dark:text-slate-200">
              Facebook Preview
            </h4>
          </div>
          <div className="p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-3 bg-white dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 text-xs uppercase">
                  {getDomain(preview.url) || "website.com"}
                </div>
                <div className="font-medium text-slate-900 dark:text-white mt-1">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
                  {preview.description || "Description not available"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="font-medium text-slate-800 dark:text-slate-200">
              Twitter Card Preview
            </h4>
          </div>
          <div className="p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-3 bg-white dark:bg-slate-800">
                <div className="font-medium text-slate-900 dark:text-white">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
                  {preview.description || "Description not available"}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                  {getDomain(preview.url) || "website.com"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div className="border dark:border-slate-700 rounded-md overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
            <h4 className="font-medium text-slate-800 dark:text-slate-200">
              LinkedIn Preview
            </h4>
          </div>
          <div className="p-4 dark:bg-slate-800">
            <div className="border dark:border-slate-700 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-200 dark:bg-slate-700 h-40 flex items-center justify-center">
                {preview.image ? (
                  <img
                    src={preview.image}
                    alt="Preview image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-500 text-sm">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-3 bg-white dark:bg-slate-800">
                <div className="font-medium text-slate-900 dark:text-white">
                  {preview.title || "Title not available"}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  {getDomain(preview.url) || "website.com"}
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
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
