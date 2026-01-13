"use client"
import { Button } from '@/core/ui/button'

const page = () => {
    return (
        <div className='mt-32 ml-10 bg-neutral-900'>
            <style jsx>{`
                .golden-button {
                    position: relative;
                    background: #000000;
                    color: #D4AF37;
                    font-weight: 700;
                    border: 2px solid #D4AF37;
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), inset 0 0 10px rgba(212, 175, 55, 0.1);
                    transition: all 0.3s ease;
                    text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
                }
                
                .golden-button:hover {
                    background: #000000;
                    color: #F4E4B0;
                    border-color: #F4E4B0;
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.2);
                    text-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
                    transform: translateY(-2px);
                }
                
                .golden-button:active {
                    transform: translateY(0);
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 10px rgba(212, 175, 55, 0.15);
                }
                    .gold-text {
                          background: linear-gradient(
                            135deg,
                            #f7e7a1 0%,
                            #d4af37 25%,
                            #bfa133 50%,
                            #ffd700 75%,
                            #c9a227 100%
                          );
                          -webkit-background-clip: text;
                          -webkit-text-fill-color: transparent;
                          background-clip: text;
                        }
            `}</style>
            <h1 className="gold-text">STUDIO 57</h1>

            <Button className="golden-button">
                Get Started
            </Button>
        </div>

    )
}

export default page