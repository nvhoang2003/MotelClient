"use client"
import "bootstrap/dist/css/bootstrap.css"
import "../../../public/assets/css/dashboard_home.css"
import "../../../public/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import {getApi, postApi, putApi, deleteApi} from "../../dataProvider/agent";
import {useEffect, useState} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Box} from "@mui/material";
import 'react-quill/dist/quill.bubble.css'; // Import the bubble theme stylesheet

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});


export default function page() {

    let [allPosts, setAllPosts] = useState([])
    let [posts, setPosts] = useState([])
    let [districts, setDistricts] = useState([])
    let [cities, setCities] = useState([])

    useEffect(() => {
        getApi("/rest/auth/api/posts").then((res) => {
            let postsData = res.data;
            setAllPosts(copyArray(res.data))
            setPosts(copyArray(res.data));
        })
        getApi("/rest/auth/api/city").then((res) => {
            let cityData = res.data;
            setCities(cityData);
        })
    }, []);

    const findDistrictOfCity = async (e) => {
        e.preventDefault()
        let cityId = e.target.value;
        if (cityId === 'all') {
            console.log("Choose all city")
            console.log(allPosts)
            setPosts([...allPosts])
            return
        }
        console.log(allPosts)
        cityId = Number(cityId)
        let postsOfCity = allPosts.filter((item) => item?.district?.city?.id === cityId)
        setPosts(postsOfCity)
        console.log(allPosts)
    }
    const renderListPost = (listPost) => {
        let userImageLink = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
        return listPost.map((post, index) => {
            return (<>
                <div className="card mb-3">
                    <div className="card-header border-0 pb-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className="avatar avatar-story me-2">
                                    <a href="#!">
                                        <img className="avatar-img rounded-circle"
                                             src={userImageLink} alt="" width="40" height="40"/>
                                    </a>
                                </div>
                                <div>
                                    <div className="nav nav-divider">
                                        <h6 className="nav-item card-title mb-0">
                                            <a href="#!">
                                                {post?.createdBy?.firstName} {post?.createdBy?.lastName} - {post?.createdBy?.email}
                                            </a>
                                        </h6>
                                    </div>
                                    <p className="mb-0 small">
                                        {post?.district?.city?.name} {" > "} {post?.district?.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className='post-title'>
                            <p className='fw-bold fs-5'>{post.title}</p>
                        </div>
                        <Box sx={{width: "100%"}}>
                            {/* //  <div className='post-content'> */}
                            <ReactQuill
                                theme='bubble'
                                // modules={{}}
                                readOnly={true}
                                value={post.content}
                            />
                        </Box>
                        {/* </div> */}
                        <ul className="nav nav-stack py-3 small">
                            <li className="nav-item">
                                <a className="nav-link">
                                    <i className="bi bi-hand-thumbs-up-fill pe-1"></i>Thích (30)
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <i className="bi bi-chat-fill pe-1"></i>Bình luận (10)
                                </a>
                            </li>
                        </ul>

                        <div className="d-flex mb-3">
                            <form className="nav nav-item w-100 position-relative">
                                <textarea className="form-control pe-5 bg-light" rows="1"
                                          placeholder="Thêm bình luận"></textarea>
                                <button
                                    className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
                                    type="submit">
                                    <i className="bi bi-send-fill"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>)
        });
    }
    const renderFilterPost = () => {
        return (<>
            <div className='card'>
                <div className='card-header'>
                    <span>Tìm kiếm dựa theo thành phố</span>
                </div>
                <div className='card-body'>
                    <select className='form-select mb-3' id='districts' onChange={findDistrictOfCity}>
                        <option value='all'>Chọn thành phố</option>
                        {cities.map((city, index) => {
                            return (<option value={city.id}>{city.name}</option>)
                        })}
                    </select>
                    <div className='districts-list'>
                        {districts.map((district, index) => {
                            return (<div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                       value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox1">{district.name}</label>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        </>)
    }

    return (<div>
        <div className='container p-3'>
            <div className='row g-3'>
                <div className='col-md-8'>
                    {renderListPost(posts)}
                </div>
                <div className='col-md-4'>
                    {renderFilterPost()}
                </div>
            </div>
        </div>
    </div>)
}

function copyArray(arr) {
    return JSON.parse(JSON.stringify(arr))
}