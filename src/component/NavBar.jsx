import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, SearchIcon, HeartHandshakeIcon, Cookie, Menu, X } from 'lucide-react';
import { Autocomplete, TextField } from '@mui/joy';
import axios from 'axios';

const NavBar = () => {
    const [searchData, setSearchData] = useState('');
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [foods, setFood] = useState([])
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleChange = () => {
        try {
            axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=9e3e4e5fb1ef404495506cfc8ae5b32a&ingredients&query=${searchData}&number=10`).then((data) => {
                setFood(data?.data)
            })
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    const handleSearch = () => {
        if (searchData.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchData)}`)
            setMobileMenuOpen(false);
        }
    }

    return (
        <nav className="bg-green-500 w-full p-4 shadow-md">
            <div className="max-w-6xl mx-auto">
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Left side menu items */}
                    <div className="flex items-center text-lg text-white space-x-2">
                        <Cookie className="mr-2" />
                        <h1 className="font-bold text-xl">Cookease</h1>
                    </div>
                    
                    {/* Search area */}
                    <div className="relative flex items-center w-2/5">
                        <div className="relative flex-grow">
                            <Autocomplete
                                placeholder="Search recipes..."
                                inputValue={searchData}
                                freeSolo
                                disableClearable
                                className="rounded-l-full"
                                options={foods}
                                getOptionLabel={(option) => option.title || ''}
                                onInputChange={(event, newInputValue) => {
                                    setSearchData(newInputValue);
                                    handleChange();
                                }}
                                onChange={(event, value) => {
                                    if (value && value.id !== undefined) {
                                        navigate(`/r/${value.id}`)
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        type="search"
                                        variant="outlined"
                                        className="rounded-l-full"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '9999px 0 0 9999px',
                                                bgcolor: 'transparent',
                                                paddingLeft: '16px',
                                                height: '45px',
                                                '& fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                                    borderRight: 'none',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(255, 255, 255, 0.8)',
                                                    borderRight: 'none',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'white',
                                                    borderRight: 'none',
                                                }
                                            },
                                            input: {
                                                color: 'white',
                                                '&::placeholder': {
                                                    fontStyle: 'italic',
                                                    color: 'rgba(255, 255, 255, 0.7)',
                                                }
                                            }
                                        }}
                                    />
                                )}
                            />
                            <button 
                                onClick={handleSearch}
                                className="absolute right-0 top-0 bg-green-600 hover:bg-green-700 text-white h-full px-4 transition-colors duration-200 flex items-center justify-center border border-white border-opacity-50"
                            >
                                <SearchIcon size={20} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Navigation links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className={`${pathname === "/" ? "text-cyan-200 font-semibold" : ''} text-white flex items-center gap-2 hover:text-cyan-200 transition-colors duration-200`}>
                            <Home size={20} />
                            <span>Home</span>
                        </Link>
                        <Link to="/likes" className={`${pathname === "/likes" ? "text-cyan-200 font-semibold" : ''} text-white flex items-center gap-2 hover:text-cyan-200 transition-colors duration-200`}>
                            <HeartHandshakeIcon size={20} />
                            <span>Favorites</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden items-center justify-between">
                    {/* Logo and menu button */}
                    <div className="flex items-center text-lg text-white">
                        <Cookie className="mr-2" />
                        <h1 className="font-bold text-xl">Cookease</h1>
                    </div>
                    
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white p-2 transition-transform duration-300 ease-in-out"
                        style={{
                            transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu with Animation */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileMenuOpen 
                            ? 'max-h-96 opacity-100 mt-4' 
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col space-y-4 transform transition-transform duration-300 ease-in-out">
                        {/* Search area */}
                        <div className="relative flex items-center w-full">
                            <div className="relative flex-grow">
                                <Autocomplete
                                    placeholder="Search recipes..."
                                    inputValue={searchData}
                                    freeSolo
                                    disableClearable
                                    className="rounded-l-full w-full"
                                    options={foods}
                                    getOptionLabel={(option) => option.title || ''}
                                    onInputChange={(event, newInputValue) => {
                                        setSearchData(newInputValue);
                                        handleChange();
                                    }}
                                    onChange={(event, value) => {
                                        if (value && value.id !== undefined) {
                                            navigate(`/r/${value.id}`);
                                            setMobileMenuOpen(false);
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            type="search"
                                            variant="outlined"
                                            className="rounded-l-full"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '9999px 0 0 9999px',
                                                    bgcolor: 'transparent',
                                                    paddingLeft: '16px',
                                                    height: '45px',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                                        borderRight: 'none',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(255, 255, 255, 0.8)',
                                                        borderRight: 'none',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'white',
                                                        borderRight: 'none',
                                                    }
                                                },
                                                input: {
                                                    color: 'white',
                                                    '&::placeholder': {
                                                        fontStyle: 'italic',
                                                        color: 'rgba(255, 255, 255, 0.7)',
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <button 
                                    onClick={handleSearch}
                                    className="absolute right-0 top-0 bg-green-600 hover:bg-green-700 text-white h-full px-4 transition-colors duration-200 flex items-center justify-center border border-white border-opacity-50"
                                >
                                    <SearchIcon size={20} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Navigation links with staggered animation */}
                        <div className="flex flex-col space-y-4 bg-green-600 p-4 rounded-lg">
                            <Link 
                                to="/" 
                                className={`${pathname === "/" ? "text-cyan-200 font-semibold" : ''} text-white flex items-center gap-2 hover:text-cyan-200 transition-colors duration-200 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-4'}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ transitionDelay: '100ms' }}
                            >
                                <Home size={20} />
                                <span>Home</span>
                            </Link>
                            <Link 
                                to="/likes" 
                                className={`${pathname === "/likes" ? "text-cyan-200 font-semibold" : ''} text-white flex items-center gap-2 hover:text-cyan-200 transition-colors duration-200 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-4'}`}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ transitionDelay: '200ms' }}
                            >
                                <HeartHandshakeIcon size={20} />
                                <span>Favorites</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar