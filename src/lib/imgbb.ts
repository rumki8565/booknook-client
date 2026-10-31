interface ImgbbResponse {
  success: boolean;
  data?: { url: string };
  error?: { message: string };
}

export async function uploadImage(file: File): Promise<string> {
  const key: string | undefined = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) {
    throw new Error("The image upload key is missing.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response: Response = await fetch(
    `https://api.imgbb.com/1/upload?key=${key}`,
    {
      method: "POST",
      body: formData,
    },
  );
  const result = (await response.json()) as ImgbbResponse;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.error?.message ?? "Image upload failed. Please try again.",
    );
  }

  return result.data.url;
}
