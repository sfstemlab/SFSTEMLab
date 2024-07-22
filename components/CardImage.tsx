import { CardImageProps } from "@/types/types";
import { Redo } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

const CardImage = ({ cardImage, cardName, edhrec_link, doubleFaced, flipCard }: CardImageProps) => {
  const router = useRouter();

  return (
    <div className="relative bg-emerald-950 backdrop-blur-sm bg-opacity-50 opacity-70 hover:opacity-100 transition duration-200 ease-linear ">
      {cardImage ? (
        <>
          <div onClick={() => router.push(`/card-details/${slugify(cardName)}`)}>
            <img className="w-full object-cover p-4 rounded-3xl cursor-pointer" src={cardImage} alt={cardName} />
          </div>
          {doubleFaced && (
            <button
              className="absolute top-4 right-4 bg-blue-700 hover:bg-blue-800 p-2 rounded-full"
              onClick={flipCard}
            >
              <Redo className="text-white" />
            </button>
          )}
        </>
      ) : (
        <div className="h-96 bg-gray-500 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default CardImage;
