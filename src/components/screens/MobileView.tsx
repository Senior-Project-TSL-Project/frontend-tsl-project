import { IconButton } from "../buttons/IconButton";

export default function MobileView() {
    return (
        <div className="min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">IconButton Mobile Demo</h1>
            
            {/* Navigation Bar Example */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Navigation Bar</h2>
                <div className="flex justify-around items-center bg-gray-50 p-4 rounded-lg">
                    <IconButton
                        icon="mdi:home"
                        pattern="brand-primary"
                        size={40}
                    />
                    <IconButton
                        icon="mdi:magnify"
                        pattern="primary"
                        size={40}
                    />
                    <IconButton
                        icon="mdi:heart"
                        pattern="primary"
                        size={40}
                    />
                    <IconButton
                        icon="mdi:account"
                        pattern="primary"
                        size={40}
                    />
                </div>
            </section>

            {/* Action Buttons */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Actions</h2>
                <div className="flex gap-3 flex-wrap">
                    <IconButton
                        icon="mdi:share-variant"
                        pattern="brand-inverted"
                        size={40}
                        onClick={() => alert('Share')}
                    />
                    <IconButton
                        icon="mdi:bookmark"
                        pattern="brand-inverted"
                        size={40}
                        onClick={() => alert('Bookmark')}
                    />
                    <IconButton
                        icon="mdi:download"
                        pattern="brand-inverted"
                        size={40}
                        onClick={() => alert('Download')}
                    />
                    <IconButton
                        icon="mdi:dots-vertical"
                        pattern="brand-inverted"
                        size={40}
                    />
                </div>
            </section>

            {/* Small Size Actions */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Small Icons</h2>
                <div className="flex gap-3">
                    <IconButton
                        icon="mdi:thumb-up"
                        pattern="primary"
                        size={20}
                    />
                    <IconButton
                        icon="mdi:comment"
                        pattern="primary"
                        size={20}
                    />
                    <IconButton
                        icon="mdi:share"
                        pattern="primary"
                        size={20}
                    />
                </div>
            </section>

            {/* Media Controls */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-3">Media Controls</h2>
                <div className="flex justify-center gap-4 items-center bg-gray-50 p-6 rounded-lg">
                    <IconButton
                        icon="mdi:skip-previous"
                        pattern="primary"
                        size={40}
                    />
                    <IconButton
                        icon="mdi:play"
                        pattern="brand-primary"
                        size={40}
                    />
                    <IconButton
                        icon="mdi:skip-next"
                        pattern="primary"
                        size={40}
                    />
                </div>
            </section>
        </div>
    );
}