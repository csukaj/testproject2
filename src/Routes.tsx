import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import BlogPostPage from "./pages/BlogPost";
import ComponentsPage from "./pages/ComponentsPage";
import LayoutPage from "./pages/LayoutPage";
import LayoutExamplePage from "./pages/LayoutExamplePage";
import AccommodationDetailPage from "./pages/AccommodationDetailPage";
import * as React from "react";
import BeautifulPage from "./pages/BeautifulPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <TestPage />
  },
  {
    path: "/test/:id",
    element: <BlogPostPage />,
  },
  {
    path: "/blog",
    element: <TestPage />
  },
  {
    path: "/components",
    element: <ComponentsPage />
  },
  {
    path: "/layout",
    element: <LayoutPage />
  },
  {
    path: "/layoutExample",
    element: <LayoutExamplePage />
  },
  {
    path: "/accommodation/:id",
    element: <AccommodationDetailPage />
  },
  {
    path: "/beautifulPage",
    element: <BeautifulPage />
  }
]

export default routes