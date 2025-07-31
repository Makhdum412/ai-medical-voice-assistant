import React, { useState } from 'react'
import Image from 'next/image'

function HistoryList() {
    const [historyList, setHistoryList] = useState([]);
    
    return (
        <div>
            {historyList.length === 0 ? (
                <div>
                    <Image 
                        src="/medical-assistance.png" 
                        alt="empty" 
                        width={100} 
                        height={200} 
                    />
                </div>
            ) : (
                <div>
                    List
                </div>
            )}
        </div>
    )
}

export default HistoryList