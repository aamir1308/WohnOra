export default function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto'>
      <div className='max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8'>
        <div className='col-span-2 md:col-span-1'>
          <h3 className='text-lg font-bold mb-2 text-white'>WohnOra-Germany</h3>
          <p className='text-sm text-gray-500 leading-relaxed'>Built with AI Factory &#183; Powered by React + Vite + Tailwind</p>
        </div>
        <div><h4 className='mb-3 text-sm uppercase tracking-wide text-white font-semibold'>Product</h4><ul className='space-y-2'><li className='hover:text-white cursor-pointer text-sm'>Live Map</li><li className='hover:text-white cursor-pointer text-sm'>Price Alerts</li><li className='hover:text-white cursor-pointer text-sm'>Route Planner</li><li className='hover:text-white cursor-pointer text-sm'>Station Finder</li></ul></div>
        <div><h4 className='mb-3 text-sm uppercase tracking-wide text-white font-semibold'>Company</h4><ul className='space-y-2'><li className='hover:text-white cursor-pointer text-sm'>About</li><li className='hover:text-white cursor-pointer text-sm'>Blog</li><li className='hover:text-white cursor-pointer text-sm'>Careers</li><li className='hover:text-white cursor-pointer text-sm'>Press</li></ul></div>
        <div><h4 className='mb-3 text-sm uppercase tracking-wide text-white font-semibold'>Legal</h4><ul className='space-y-2'><li className='hover:text-white cursor-pointer text-sm'>Privacy</li><li className='hover:text-white cursor-pointer text-sm'>Terms</li><li className='hover:text-white cursor-pointer text-sm'>GDPR</li><li className='hover:text-white cursor-pointer text-sm'>Imprint</li></ul></div>
      </div>
      <div className='border-t border-gray-800 pt-6 max-w-7xl mx-auto px-4'>
        <p className='text-xs text-gray-500'>&#169; 2026 WohnOra-Germany &#183; All rights reserved</p>
      </div>
    </footer>
  )
}
