import NotFound from "@/app/not-found";
import { getProductBySlug } from "@/lib/wordpress";
import { Metadata } from "next";
import Achievement from "./achievement";
import Product from "./product";
import Products from "./products";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all categories of our blog posts",
  alternates: {
    canonical: "/posts/categories",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ breadcrumb: string[], slug: string }>;
}) {

  const { breadcrumb, slug } = await params;

  const product = await getProductBySlug(breadcrumb[breadcrumb.length - 1]);

  // si slug est différent de "realisations" ou est différent de "produits", on retourne une 404
  if (slug !== "realisations" && slug !== "produits")
    return <NotFound />;

  if (slug === "realisations") return <Achievement slug={breadcrumb[0]} />

  if (slug === "produits" && product) return <Product breadcrumb={breadcrumb} slug={breadcrumb[breadcrumb.length - 1]} />

  if (slug === "produits" && !product) return <Products slug={breadcrumb[breadcrumb.length - 1]} breadcrumb={breadcrumb} />

  return <NotFound />
}
