import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    const projectList = [
        {
            id: 1,
            title: "VILLA RIVERSIDE",
            category: "KIẾN TRÚC BIỆT THỰ",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
            size: "col-lg-8"
        },
        {
            id: 2,
            title: "SKYLINE PENTHOUSE",
            category: "CĂN HỘ CAO CẤP",
            image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
            size: "col-lg-4"
        },
        {
            id: 3,
            title: "MODERN OFFICE",
            category: "VĂN PHÒNG",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
            size: "col-lg-4"
        },
        {
            id: 4,
            title: "CONCEPT HOUSE",
            category: "NHÀ PHỐ",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
            size: "col-lg-8"
        }
    ];

    return (
        <section id="projects" style={{ backgroundColor: '#111', overflow: 'hidden' }}>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    {/* Hero Header Block */}
                    <div className="col-lg-12 bg-white p-5 p-lg-10 text-center">
                        <motion.h6 initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="ls-5 uppercase small mb-4 fw-bold" style={{ color: '#c5a059' }}>MASTERPIECES</motion.h6>
                        <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="brand-font display-2 m-0" style={{ letterSpacing: '-3px' }}>CÁC DỰ ÁN TIÊU BIỂU</motion.h2>
                    </div>

                    {/* Seamless Grid */}
                    {projectList.map((project, index) => (
                        <div key={project.id} className={`${project.size} position-relative overflow-hidden group`} style={{ height: '600px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <motion.img 
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src={project.image} 
                                className="w-100 h-100 object-fit-cover transition-transform duration-1000 group-hover-scale-110" 
                                alt={project.title} 
                            />
                            
                            {/* Hover Overlay - Solid & Tight */}
                            <div className="position-absolute inset-0 d-flex flex-column justify-content-end p-5 opacity-0 group-hover-opacity-100 transition-all duration-500" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                                <motion.div 
                                    initial={{ y: 50 }}
                                    whileHover={{ y: 0 }}
                                    className="text-white"
                                >
                                    <span className="small ls-3 fw-bold" style={{ color: '#c5a059' }}>{project.category}</span>
                                    <h3 className="brand-font display-5 mt-2 mb-4">{project.title}</h3>
                                    <button className="btn btn-outline-light rounded-0 px-5 py-3 ls-3 small uppercase fw-bold">KHÁM PHÁ</button>
                                </motion.div>
                            </div>

                            {/* Static Bottom Label - Minimal */}
                            <div className="position-absolute bottom-0 left-0 p-4 w-100 d-flex justify-content-between align-items-end group-hover-opacity-0 transition-opacity">
                                <h4 className="text-white brand-font h2 m-0 shadow-text">{project.title}</h4>
                                <span className="text-white opacity-50 small ls-2">0{index + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
