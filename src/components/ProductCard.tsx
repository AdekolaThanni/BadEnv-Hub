//@ts-nocheck

const ProductCard = ({ title, imageSrc, description, handle }: any) => {
  // Replace 'YOUR_DISCOUNT_CODE' with the actual discount code you want to use
  const discountCode = "6KP9FU5ZJ";

  // Function to create the URL to the product with the discount code
  const createProductUrlWithDiscount = (handle: any, discountCode: any) => {
    // Encode the discount code to ensure special characters are handled correctly
    const encodedDiscountCode = encodeURIComponent(discountCode);
    return `https://44bfef.myshopify.com/products/${handle}?discount=${encodedDiscountCode}`;
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all delay-75 bg-black shadow-md cursor-pointer rounded-3xl hover:opacity-80 hover:translate-y-2 product-card">
      {/* Image div */}
      <div
        className="flex-none w-full bg-center bg-no-repeat bg-contain h-[300px]"
        style={{ backgroundImage: `url(${imageSrc})` }}
        aria-label={`Image of ${title}`}
      ></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        <div className="flex-1 w-full flex-col">
          <h2 className="text-lg truncate w-full text-center font-bold text-white product-title">
            {title}
          </h2>
        </div>
        <a
          href={createProductUrlWithDiscount(handle, discountCode)}
          target="_blank" // Opens the link in a new tab
          rel="noopener noreferrer" // Security measure for opening links in new tabs
          className="px-4 py-2 border-2 border-white text-white font-bold flex items-center gap-2 mt-3 rounded-[10px]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8.94073C20.9896 8.84887 20.9695 8.75836 20.94 8.67073V8.58073C20.8919 8.47791 20.8278 8.3834 20.75 8.30073L14.75 2.30073C14.6673 2.22295 14.5728 2.15881 14.47 2.11073C14.4402 2.10649 14.4099 2.10649 14.38 2.11073C14.2784 2.05247 14.1662 2.01508 14.05 2.00073H10C9.20435 2.00073 8.44129 2.3168 7.87868 2.87941C7.31607 3.44202 7 4.20508 7 5.00073V6.00073H6C5.20435 6.00073 4.44129 6.3168 3.87868 6.87941C3.31607 7.44202 3 8.20508 3 9.00073V19.0007C3 19.7964 3.31607 20.5594 3.87868 21.1221C4.44129 21.6847 5.20435 22.0007 6 22.0007H14C14.7956 22.0007 15.5587 21.6847 16.1213 21.1221C16.6839 20.5594 17 19.7964 17 19.0007V18.0007H18C18.7956 18.0007 19.5587 17.6847 20.1213 17.1221C20.6839 16.5594 21 15.7964 21 15.0007V9.00073V8.94073ZM15 5.41073L17.59 8.00073H16C15.7348 8.00073 15.4804 7.89538 15.2929 7.70784C15.1054 7.5203 15 7.26595 15 7.00073V5.41073ZM15 19.0007C15 19.2659 14.8946 19.5203 14.7071 19.7078C14.5196 19.8954 14.2652 20.0007 14 20.0007H6C5.73478 20.0007 5.48043 19.8954 5.29289 19.7078C5.10536 19.5203 5 19.2659 5 19.0007V9.00073C5 8.73552 5.10536 8.48116 5.29289 8.29363C5.48043 8.10609 5.73478 8.00073 6 8.00073H7V15.0007C7 15.7964 7.31607 16.5594 7.87868 17.1221C8.44129 17.6847 9.20435 18.0007 10 18.0007H15V19.0007ZM19 15.0007C19 15.2659 18.8946 15.5203 18.7071 15.7078C18.5196 15.8954 18.2652 16.0007 18 16.0007H10C9.73478 16.0007 9.48043 15.8954 9.29289 15.7078C9.10536 15.5203 9 15.2659 9 15.0007V5.00073C9 4.73552 9.10536 4.48116 9.29289 4.29363C9.48043 4.10609 9.73478 4.00073 10 4.00073H13V7.00073C13 7.79638 13.3161 8.55944 13.8787 9.12205C14.4413 9.68466 15.2044 10.0007 16 10.0007H19V15.0007Z"
              fill="white"
            />
          </svg>
          COPY LINK
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
