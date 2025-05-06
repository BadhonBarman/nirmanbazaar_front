import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ReactSlider from 'react-slider';

export default function CategoryPage() {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const {category} = useParams()
    const location = useLocation();
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [CategoryName, setCategoryName] = useState("")
    const [SubCategoryName, setSubCategoryName] = useState("")
    const [SubSubCategoryName, setSubSubCategoryName] = useState("")
    const [Products, setProducts] = useState([])
    const [TotalProducts, setTotal] = useState(0)
    const [subCategory, setSubCategory] = useState([])
    const [Brands, setBrands] = useState([])

    

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');

    const initialPage = parseInt(queryParams.get('page')) || 1;
    const [CurrentPage, setCurrentPage] = useState(initialPage);
    const productsPerPage = 8;
    const totalPages = Math.ceil(TotalProducts / productsPerPage);

    const [range, setRange] = useState([0, 100]);
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [rangestatus, setRangeStatus] = useState(false);

    console.log("page name : ", category)
    console.log("query params: ", queryParams)
    console.log("brand query : ", searchParams.get('brand'))
    console.log("category query : ", searchParams.get('category'))
    console.log("sub category query : ", searchParams.get('sub_category'))

    // useEffect(() => {
    //     const brand = queryParams.get('brand') || '';
    //     const category = queryParams.get('category') || '';
    //     setSelectedBrand(brand);
    //     setSelectedSubCategory(category);
    // }, [queryParams]);

    console.log('price range : ', range )
    useEffect(() => {
        const brand = searchParams.get('brand') || '';
        const subCategory = searchParams.get('category') || '';
    
        setSelectedBrand(brand);
        setSelectedSubCategory(subCategory);
    }, []); // Only on initial mount
    
    const handleCheckboxChange = (type, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (type === 'brand') {
            params.set('brand', value);
            setSelectedBrand(value);
        } else if (type === 'category') {
            params.set('category', value);
            setSelectedSubCategory(value);
        }
        else if (type === 'sub_category') {
            params.set('sub_category', value);
            setSelectedSubSubCategory(value);
        }

        navigate(`/category/${CategoryName}?${params.toString()}`);
    };


    useEffect(()=>{
        setCategoryName(category)
        setSubCategoryName(searchParams.get('category'))
        setSubSubCategoryName(searchParams.get('sub_category'))
        
        setSelectedSubSubCategory(searchParams.get('sub_category'));
    }, [category, searchParams])


    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.post(`${base_domain}/category_items/`, {
                    slug:category,
                    page: CurrentPage,
                    items_per_page: productsPerPage,
                    brand: selectedBrand,
                    category: selectedSubCategory,
                    sub_category:selectedSubSubCategory
                });
                setSubCategory(response.data.subcategory);
                setBrands(response.data.brands);        
                setRange([response.data.price_range.min_price, response.data.price_range.max_price])
                setMin(response.data.price_range.min_price);
                setMax(response.data.price_range.max_price);
            }
            catch (error) {
                    console.error(error);
                }
            }
    fetchData()
    }, [base_domain,category]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.post(`${base_domain}/category_items/`, {
                    slug:category,
                    page: CurrentPage,
                    items_per_page: productsPerPage,
                    brand: selectedBrand,
                    category: selectedSubCategory,
                    min : min,
                    max:max,
                    sub_category:selectedSubSubCategory
                });
                console.log("category view data : ",response.data)
                setProducts(response.data.products);
                setTotal(response.data.total_count)
            }
            catch (error) {
                console.error(error);
            }
        }
    fetchData()
}, [category, CurrentPage, selectedBrand, selectedSubCategory, selectedSubSubCategory,searchParams.get('min'), searchParams.get('max') ]);


    
        useEffect(() => {
          // Check if CurrentPage exceeds totalPages and reset to 1 if needed
          if (CurrentPage > totalPages) {
            setCurrentPage(1);
            return;
          }
          
          // Update the URL based on the current page
          if (CurrentPage === 1) {
            navigate(location.pathname, { replace: true }); // Remove the page parameter for the first page
          } else {
            queryParams.set('page', CurrentPage);
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
          }
        }, [CurrentPage]);
        

        const handlerangeSubmit = (e) => {
            e.preventDefault();
            const params = new URLSearchParams(location.search);
        
            if (min !== '') {
              params.set('min', min);
            } else {
              params.delete('min');
            }
        
            if (max !== '') {
              params.set('max', max);
            } else {
              params.delete('max');
            }
            navigate(`${location.pathname}?${params.toString()}`);
        };
          
            

    const handleSliderChange = (value) => {
        setRange(value);
      };


  const handlePrevPage = () => {
    if (CurrentPage > 1) setCurrentPage(CurrentPage - 1);
  };

  const handleNextPage = () => {
    if (CurrentPage < totalPages) setCurrentPage(CurrentPage + 1);
  };

    const fill_start = (
        <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
    )

    const blank_start = (
        <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
    )


    
    document.title = CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

   
  return (
                            <>
                            <div className="row mt-2.5">
                                <div className="col-md-3">
                                    <div className="filter_sidebar hidden lg:block">

                                    <div className=''>
                                            <h4 className='font-medium py-3'>Price Range</h4>

                                            <form onSubmit={handlerangeSubmit} className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={min}
                                onChange={(e) => setMin(e.target.value)}
                                min={range[0]}
                                max={range[1]}
                                className="border p-1 rounded max-w-[7rem]"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                                min={range[0]}
                                max={range[1]}
                                className="border p-1 rounded max-w-[7rem]"
                            />
                            <button type="submit" className="bg-blue-500 text-white px-2.5 py-1 rounded">
                                Apply
                            </button>
                            </form>
                            <p className='italic text-sm text-yellow-500 font-semibold'>**Price Range : {range[0]}TK to {range[1]}TK</p>

                    {/* <div className="dual-range-slider">
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="slider-thumb"
                            trackClassName="slider-track"
                            min={0}
                            max={100}
                            value={range}
                            onChange={handleSliderChange}
                            minDistance={1}  // Ensure min and max don't overlap
                            withTracks={true}
                            pearling={true}  // Allows you to drag both handles together
                            renderThumb={(props, state) => <div className='shadow-sm' {...props}></div>}  // Display value inside the thumb
                        />
                        <p> Price: {range[0]} - {range[1]} </p>
                    </div> */}
               </div>

               {subCategory.length > 0 && (
                <div>
                    <h4 className='font-medium py-3'>Sub Category</h4>
                    <ul className='flex flex-col gap-2'>
                        {subCategory.map((data, index) => (
                            <li key={index} className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={selectedSubCategory === data.slug}
                                    onChange={() => handleCheckboxChange('category', data.slug)}
                                    id={`cat-${data.slug}`}
                                    className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500'
                                />
                                <label htmlFor={`cat-${data.slug}`} className='text-sm font-medium'>{data.title}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {Brands.length > 0 && (
                <div>
                    <h4 className='font-medium py-3'>Brands</h4>
                    <ul className='flex flex-col gap-2'>
                        {Brands.map((data, index) => (
                            <li key={index} className='flex items-center'>
                                <input
                                    type="checkbox"
                                    checked={selectedBrand === data.slug}
                                    onChange={() => handleCheckboxChange('brand', data.slug)}
                                    id={`brand-${data.slug}`}
                                    className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500'
                                />
                                <label htmlFor={`brand-${data.slug}`} className='text-sm font-medium'>{data.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

                <div className='mt-4'>
                    <h4 className='font-medium py-3'>Rating</h4>
                    
                    <div className='flex my-2 items-center'>
                        <input id='five' type="checkbox" className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="five">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='four' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="four">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='three' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="three">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex items-center'>
                        <input type="checkbox" id='two' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="two">
                            <ul className='flex my-2 items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='one' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />
                        <label htmlFor="one">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>
                    
                </div>

            </div>
        </div>

        <div className="col-md-9">
            <div className="py-8 px-4 rounded bg-gray-100">
                <h2 className='font-semibold text-gray-800 text-base lg:text-2xl flex flex-wrap items-center gap-2 lg:gap-2.5'>
                    {CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} 
                    
                    {SubCategoryName && 
                    <>
                        <span>
                            <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                        </span>
                        {SubCategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </>
                    }

                    {SubSubCategoryName && 
                        <>
                        <span>
                            <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                        </span>
                        {SubSubCategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </>
                    }
                </h2>
            </div>
            
            <div className="row py-4">
                <div className="col-md-3">
                    <p className='text-md'><span className='font-semibold'>{TotalProducts}</span> Products Found</p>
                    
                </div>
                <div className="col-md-9">
                    <div className="flex justify-between lg:justify-end items-center">
                        
                        {/* <select className='rounded-md' name="sorting" id="sorting">
                            <option value="featured">Sort by: Newest</option>
                            <option value="featured">Sort by: Oldest</option>
                            <option value="featured">Price: Low to High</option>
                            <option value="featured">Price: High to Low</option>
                            <option value="featured">Avg. Rating</option>
                        </select> */}
                        <div></div>

                        <button className="lg:hidden flex flex-row items-center gap-2"  type="button" data-bs-toggle="offcanvas" data-bs-target="#filtermenucanvas" >
                            <svg className='h-4 w-4 fill-gray-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
                            <span className='font-medium'>Filter</span>
                        </button>

                        <div class="offcanvas offcanvas-end max-w-[300px]" data-bs-scroll="true" tabindex="-1" id="filtermenucanvas" aria-labelledby="filtermenucanvas">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="filtermenucanvas">Filter Menu</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                            <div>
                                        <h4 className='font-medium py-3'>Price Range</h4>

                                        <div className="dual-range-slider">
                                            {/* <ReactSlider
                                                className="horizontal-slider"
                                                thumbClassName="slider-thumb"
                                                trackClassName="slider-track"
                                                min={range[0]}
                                                max={range[1]}
                                                value={range}
                                                onChange={handleSliderChange}
                                                minDistance={1}  // Ensure min and max don't overlap
                                                withTracks={true}
                                                pearling={true}  // Allows you to drag both handles together
                                                renderThumb={(props, state) => <div className='shadow-sm' {...props}></div>}  // Display value inside the thumb
                                            />
                                            <p> Price: {range[0]} - {range[1]} </p> */}
                                            
                                            <form onSubmit={handlerangeSubmit} className="flex gap-2 items-center">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={min}
                                onChange={(e) => setMin(e.target.value)}
                                min={range[0]}
                                max={range[1]}
                                className="border p-1 rounded max-w-[7rem]"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                                min={range[0]}
                                max={range[1]}
                                className="border p-1 rounded max-w-[7rem]"
                            />
                            <button type="submit" className="bg-blue-500 text-white px-2.5 py-1 rounded">
                                Apply
                            </button>
                            </form>
                            <p className='italic text-sm text-yellow-500 font-semibold'>**Price Range : {range[0]}TK to {range[1]}TK</p>

                                        </div>
                                </div>

                                {subCategory.length > 0 && (
                                    <div>
                                        <h4 className='font-medium py-3'>Sub Category</h4>
                                        <ul className='flex flex-col gap-2'>
                                            {subCategory.map((data, index) => (
                                                <li key={index} className='flex items-center'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubCategory === data.slug}
                                                        onChange={() => handleCheckboxChange('category', data.slug)}
                                                        id={`cat-${data.slug}`}
                                                        className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500'
                                                    />
                                                    <label htmlFor={`cat-${data.slug}`} className='text-sm font-medium'>{data.title}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {Brands.length > 0 && (
                                    <div>
                                        <h4 className='font-medium py-3'>Brands</h4>
                                        <ul className='flex flex-col gap-2'>
                                            {Brands.map((data, index) => (
                                                <li key={index} className='flex items-center'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBrand === data.slug}
                                                        onChange={() => handleCheckboxChange('brand', data.slug)}
                                                        id={`brand-${data.slug}`}
                                                        className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500'
                                                    />
                                                    <label htmlFor={`brand-${data.slug}`} className='text-sm font-medium'>{data.name}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Products.length === 0 ? (<p className='col-span-2 lg:col-span-4 w-full text-center border border-gray-100 py-4 rounded'>No Product Found !</p>):(Products.map((data, index)=>(
                    <div key={data.id} className="">
                        <div className="product_card max-md:h-[252px] h-[292px] border border-gray-100 rounded-lg">
                            <Link to={`/product/${data.slug}`}>
                                <img className='w-full h-32 lg:!h-48 object-cover rounded-lg' src={`${base_domain}${data.image}`} alt="" />

                                <div className="product_card_text p-2">
                                <h4 className='text-sm text-start font-medium'>{data.title}</h4>
                                {data.price > 0 ? (
                    <p className="text-md font-medium text-right mt-2 text-green-500">{data.price} tk</p>
                  ):(<p className="text-md font-medium text-right mt-2 text-red-500">TBA</p>)}
                                </div>
                            </Link>
                            
                        </div>
                                
                    </div>
                )))}
            </div>

            {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button onClick={handlePrevPage} disabled={CurrentPage === 1} className="p-3.5 mx-1 bg-gray-300 rounded-full disabled:opacity-50">
                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </button>
            <span className="px-4 py-2 mx-2">Page {CurrentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={CurrentPage === totalPages} className="p-3.5 mx-1 bg-gray-300 rounded-full disabled:opacity-50">
                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </button>
          </div>
          
        </div>
    </div>
    </>
  )
}
