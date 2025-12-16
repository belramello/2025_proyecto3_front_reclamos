import React, { useState } from "react";
import type { ChangeEvent } from "react";

interface CloudinaryProps {
    onImagesUploaded: (urls: string[]) => void;
}

const Cloudinary: React.FC<CloudinaryProps> = ({ onImagesUploaded }) => {
    const preset_name = "reclamos"; 
    const cloud_name = "dkrct4oa0";

    const [previewImages, setPreviewImages] = useState<string[]>([]);
    
    const handleFileSelection = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);

        const uploadedUrls: string[] = [];
        
        for (const file of files) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", preset_name);

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );
    
                if (!res.ok) {
                    throw new Error(`Cloudinary upload failed with status: ${res.status}`);
                }

                const result = await res.json();
                uploadedUrls.push(result.secure_url);
            } catch (error) {
                console.error("Error subiendo el archivo:", error);
            }
        }

        onImagesUploaded(uploadedUrls);

    };

    return (
        <div className="space-y-3">
            <label className="cursor-pointer block w-100 h-10 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
                <input
                    type="file"
                    multiple
                    onChange={handleFileSelection}
                    className="hidden"
                />
                <span className="text-gray-400 text-xl leading-none">+</span>
            </label>

            {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {previewImages.map((src, i) => (
                        <img
                            key={i} 
                            src={src}
                            alt={`preview-${i}`}
                            className="w-20 h-20 object-cover rounded border"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cloudinary;