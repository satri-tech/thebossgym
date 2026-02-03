"use client"
import ExpandableGallery from '@/core/components/expandable-gallery'
import { TrainerImages } from '../../../public/trainers'
const page = () => {

    return (
        <div className="min-h-screen dark:bg-black bg-white flex items-center justify-center p-8">
            <ExpandableGallery images={TrainerImages} className="w-11/12 max-w-7xl" />
        </div>
    )
}

export default page