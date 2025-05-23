import Link from "next/link";
import React from "react";
import Image from "next/image";

const CategoryItem = ({ data }) => {
  return (
    <div className="gi-cat-icon">
      <div className="category-image">
        <Image
          src={data.image}
          alt={data.name}
          width={60}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="gi-cat-detail">
        <Link href={`/shop-left-sidebar-col-3?categoryId=${data._id}`}>
          <h4 className="gi-cat-title">{data.name}</h4>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;