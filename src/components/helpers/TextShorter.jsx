export default function TextShorter({ text, range }) {
    const truncateText = (text, limit) => {
      if (text.length > limit) {
        return text.substring(0, limit) + '...';
      }
      return text;
    };
  
    return (
      <div>
        {truncateText(text, range)}
      </div>
    );
  }
  