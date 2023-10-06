import React from 'react';
import image1 from "../img/image1.jpg";
import image2 from "../img/image2.jpg";
import image3 from "../img/image3.jpg";
import image4 from "../img/image4.jpg";

const AboutPage = () => {
  return (
    <div className="about">
      <h2>About Us</h2>
          <p>
          Welcome to Yoga Muse, your ultimate yoga platform designed by yoga teachers, for yoga teachers. 
          We believe that the practice of yoga is a journey of self-discovery and self-improvement, and we're here to be your guiding light on this transformative path.
          At Yoga Muse, we're not just a platform; we're a community of passionate yogis and yoginis, and we're dedicated to helping you explore the profound depths of yoga.
          Whether you're a seasoned yogi or just stepping onto the mat for the first time, we've created an oasis where you can nurture your practice, inspire your soul, and embrace the essence of yoga.
          </p>
      <h3>What Makes Us Unique?</h3>
      <div className="circle-placeholder">
          <img src={image1} alt="Image 1" />
      </div>
      <h4>Yogis, For Yogis:</h4>
          <p>
          Our team is comprised of experienced yoga teachers who understand the intricacies of this ancient practice. 
          We've walked the path ourselves, and we're here to share our wisdom with you. 
          We know that every yogi is unique, and our platform reflects this diversity, offering something for everyone.
          </p>
      <div className="circle-placeholder">
          <img src={image2} alt="Image 2" />
      </div>
      <h4>Discover Asanas with Ease:</h4>
          <p>
          Yoga Muse offers an extensive collection of asanas categorized to suit your specific needs, 
          whether it's for flexibility, strength, balance, or relaxation. With our intuitive interface, you can explore asanas effortlessly, unlocking the power of each pose.
          </p>
      <div className="circle-placeholder">
          <img src={image3} alt="Image 3" />
      </div>
      <h4>Create Your Own Flows:</h4>
          <p>
          We empower you to become the architect of your yoga journey.
          With our user-friendly flow builder, you can craft personalized sequences that resonate with your practice and intentions.
          Let your creativity flow as you design the perfect practice for yourself or your students.
          </p>
      <div className="circle-placeholder">
          <img src={image4} alt="Image 4" />
      </div>
      <h4>Inspiration at Your Fingertips:</h4>
          <p>
          Need inspiration? 
          Look no further. 
          Yoga Muse provides a wealth of pre-designed sequences created by seasoned instructors. 
          These sequences are a source of inspiration to guide you in your practice and teaching.
          </p>
      <h3>Join Our Yogi Community:</h3>
          <p>
          Connect with like-minded individuals who share your passion for yoga. 
          Our community is a place where you can discuss, learn, and grow together, supporting one another on this beautiful journey.
          </p>
      <h3>Our Vision</h3>
         <p>
          At Yoga Muse, our vision is to create a harmonious world where yoga enriches the lives of all who embrace it.
          We believe that yoga is more than just physical postures; it's a way of life that fosters inner peace, wellness, and mindfulness.
        </p>
      <h3>Join us at Yoga Muse and embark on a transformative journey.</h3>
          <p>
            Whether you're a seasoned teacher, a dedicated student, or someone curious about the world of yoga, 
            we invite you to be part of our vibrant community. 
            Together, we'll explore, learn, and find inspiration in the art of yoga.
          </p>
      <h4> Unlock your inner yogi with Yoga Muse - your path to holistic well-being begins here.</h4>
    </div>
  );
};

export default AboutPage;
