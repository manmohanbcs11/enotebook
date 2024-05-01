import Footer from "./Footer"

export const AboutUs = () => {
  return (
    <div>
      <div className='container d-flex justify-content-center flex-column'>
        <h2 className="mb-4 text-center">About Us</h2>
        <p className="text-center">Welcome to eNotebook! Despite the name, this project is a solo effort.</p>
        <ul className="text-center list-unstyled"> {/* List without bullets */}
          <li>I developed this utility to help with everyday tasks and to meet common needs.</li>
          <li>You can save your notes anytime, anywhere, from any device, just by logging in.</li>
          <li>Once logged in, you can access your notes from any device. It's designed to be simple and convenient.</li>
          <li>And the best part? It's completely free to use. No hidden fees or subscriptions.</li>
        </ul>
        <p className="text-center">I hope you find this application useful and enjoy using it. If you have any feedback, feel free to reach out!</p>
      </div>
      <Footer />
    </div>
  )
}
