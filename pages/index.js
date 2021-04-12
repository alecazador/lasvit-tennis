import Error from "next/error";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription, urlFor } from "../utils/sanity";
//import { urlFor } from "../utils/sanity";
import RenderSections from "../components/RenderSections";
//import renderUI from "../components/render";

import Link from "next/link";

// construct query for global data and page data
// allData -- overall grouping for global and page data in response
// globalData -- global reusable content
// pageData -- content for this specific page, not in draft
const query = `{
  'globalData': *[(_type == "globalSettings" && !(_id in path('drafts.**')))][0] {
	...
	},
  'pageData': *[(_type == "page" && title=="Home" && !(_id in path('drafts.**')))][0] {
    'recentPosts': *[_type=="post" && !(_id in path('drafts.**'))]| order(publishedAt desc)[0..2],
    title,
    content[]{
      ...,
      team_members[]{
        author->{
        _id,
        _type,
        bio,
        headline,
        image,
        name,
        slug
        }
      }
    }
}
}`

/* OLD QUERY
const query = `{
  'globalData': *[(_type == "globalSettings" && !(_id in path('drafts.**')))][0] {
	...
	},
  'pageData': *[(_type == "page" && title=="Home" && !(_id in path('drafts.**')))][0] {
    'recentPosts': *[_type=="post" && !(_id in path('drafts.**'))]| order(publishedAt desc)[0..2],
    title,
    content[]{
      ...,
      team_members[]{
        author->{
        _id,
        _type,
        bio,
        headline,
        image,
        name,
        slug
        }
      }
    }
}
}`;
*/

// main page component renders
function IndexPage(props) {
  const { allData, preview } = props;
  const router = useRouter();
  // write out allData for debugging
  console.log ("allData => ",allData)

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!allData) {
    return <Error statusCode={404} />;
  }

  const { data: page } = usePreviewSubscription(query, {
    initialData: allData,
    enabled: preview || router.query.preview !== null,
  });

  return (
    <>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      
      <div className="bg-white">
        <header class="text-gray-600 body-font">
          <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href="/">
              <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
                <img
                  src={urlFor(allData.globalData.logo)
                    .auto("format")
                    .width(125)
                    // .height(400)
                    .fit("crop")
                    .quality(80)}
                  alt={
                    allData.globalData.logo?.alt ||
                    `Photo of ${allData.globalData.title}`
                  }
                />
              </a>
            </Link>
            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <Link href="/">
                <a class="mr-5 hover:text-gray-900 cursor-pointer">Home</a>
              </Link>
              <Link href="/about">
                <a class="mr-5 hover:text-gray-900 cursor-pointer">About</a>
              </Link>
              <Link href="/blog">
                <a class="mr-5 hover:text-gray-900 cursor-pointer">Blog</a>
              </Link>
              {/* <Link href="/contact">
                <a class="mr-5 hover:text-gray-900 cursor-pointer">
                  Contact Us
                </a>
              </Link> */}
            </nav>
          </div>
        </header>
        <RenderSections sections={allData.mainContent.content} />
        <footer class="text-gray-600 body-font">
          <div class="bg-gray-100 border-t border-gray-200">
            <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
              <Link href="/">
                <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
                  <img
                    src={urlFor(allData.globalData.logo)
                      .auto("format")
                      .width(80)
                      // .height(400)
                      .fit("crop")
                      .quality(80)}
                    alt={
                      allData.globalData.logo?.alt ||
                      `Photo of ${allData.globalData.title}`
                    }
                  />
                </a>
              </Link>

              <p class="text-sm text-gray-600 sm:ml-6 sm:mt-0 mt-4">
                © 2021 Lasvit Tennis. All rights reserved.
              </p>

              <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
                <Link href="/privacy">
                  <a
                    // href="/privacy"
                    rel="noopener noreferrer"
                    class="text-gray-600 ml-1"
                    // target="_blank"
                  >
                    Privacy Policy
                  </a>
                </Link>{" "}
                //
                <Link href="/terms">
                  <a
                    // href="https://lasvittennis.com/terms"
                    rel="noopener noreferrer"
                    class="text-gray-600 ml-1"
                    // target="_blank"
                  >
                    Website Terms
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps({ params = {}, preview = false }) {
  var allData = await getClient(preview).fetch(query);

  return {
    props: {
      preview,
      allData,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default IndexPage;
