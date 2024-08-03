// src/Components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase";
import { Button, Card ,Navbar} from 'flowbite-react';
function Home() {
    const navigate = useNavigate();
   

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
};
    const handleCardClick =  () => {
        navigate('/employee-hierarchy');
    };
    const handleProfileClick = () => {
        navigate('/profile');
    };
  


  return (
    <div className="min-h-screen bg-white">
        <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="/">
                    <span className="text-xl font-semibold dark:text-white">Home</span>
                </Navbar.Brand>
                <Navbar.Collapse>
                    
                    <Button onClick={handleProfileClick}>Profile</Button> 
                    <Button onClick={handleSignOut} color="gray">Sign Out</Button>
                </Navbar.Collapse>
            </Navbar>

        <header className="relative">
        <img src="/img/AdobeStock_96488334.jpeg" alt="Elephant" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl text-white font-bold">SAP HR/Payroll and S/4HANA Specialist</h1>
        </div>
        </header>
        <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center cursor-pointer" onClick={handleCardClick} >
              <img src="img/hierarchy-2-node-organization-links-structure-link-nodes-network-hierarchy-icon-2048x2047-chugebfo.png" alt="Employee Hierarchy" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Employee Hierarchy</h3>
            </Card>
            <Card className="text-center">
                <img src="/path/to/overview-icon.jpg" alt="Payroll Services" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Payroll Services</h3>
            </Card>
            <Card className="text-center">
                <img src="/path/to/offices-icon.jpg" alt="Leave Services" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Leave Services</h3>
            </Card>
            </div>
        </div>
        </section>
  </div>
  );
}

export default Home;