const Label = ({ type = "paragraph", bold, italic, size = "md", children }) => {
    const Tag = type === "title" ? "h1" : type === "subtitle" ? "h2" : "p";
  
    const baseStyles = "text-gray-800";
    const fontWeight = bold ? "font-bold" : "font-normal";
    const fontStyle = italic ? "italic" : "not-italic";
    const textSize =
      size === "lg" ? "text-xl" : size === "md" ? "text-base" : "text-sm";
  
    return (
      <Tag className={`${baseStyles} ${fontWeight} ${fontStyle} ${textSize}`}>
        {children}
      </Tag>
    );
  };
  
  export default Label;
  