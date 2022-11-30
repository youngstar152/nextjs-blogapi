import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData} from "../../lib/posts";

export default function Post({post}){
    if(!post){
        return <div>Loading...</div>
    }
    return(
        <Layout title={post.title}>
            <p className="m-4">
                {"ID:"}{post.id}
            </p>
            <p className="mb-8 text-xl font-bold">{post.title}</p>
            <p className="px-10">{post.body}</p>

            <Link href="/blog-page">
                <div className="flex cursor-pointer mt-12">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>  
                <span>Back to blog-page</span>
                </div>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths(){
    const paths=await getAllPostIds();
    return{
        paths,
        fallback:false,
    };
}

export async function getStaticProps({params}){
    const{post:post}=await getPostData(params.id);
    return{
        props:{post,},
    };
}
