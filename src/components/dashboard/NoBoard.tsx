const NoBoard = () => {
      return (
            <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
                  <h2 className="font-bold text-4xl text-gray-800 dark:text-gray-100 tracking-tight drop-shadow-lg" 
                      style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(70, 92, 218, 0.2)'
                      }}>
                    No boards created
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium drop-shadow-md" 
                     style={{
                       textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                     }}>
                    Create your first board today!
                  </p>
            </div>
      )
}

export default NoBoard;