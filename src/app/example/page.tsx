"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownItemGroup } from "@/components/dropdowns/DropdownItemGroup";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { useState } from "react";

export default function ExamplePage() {
    // State for controlled dropdown examples
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>("en");
    const [selectedTheme, setSelectedTheme] = useState<string | null>("light");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedFont, setSelectedFont] = useState<string | null>("roboto");
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    return (
        <div className="max-w-5xl mx-auto min-h-screen border p-8">
            <h1 className="text-3xl font-bold mb-8">IconButton Examples</h1>

            {/* Primary Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Primary Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="material-symbols:home-pin-outline-rounded"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:heart-outline"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:share-variant"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:bookmark-outline"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:dots-vertical"
                        pattern="primary"
                        disabled
                    />
                </div>
            </section>

            {/* Brand Primary Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Brand Primary Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:play"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:pause"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:stop"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:skip-next"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:skip-previous"
                        pattern="brand-primary"
                        disabled
                    />
                </div>
            </section>

            {/* Brand Inverted Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Brand Inverted Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:plus"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:minus"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:close"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:check"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:pencil"
                        pattern="brand-inverted"
                        disabled
                    />
                </div>
            </section>

            {/* Different Sizes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:star"
                        pattern="brand-primary"
                        size={20}
                    />
                    <IconButton
                        icon="mdi:star"
                        pattern="brand-primary"
                        size={40}
                    />
                </div>
            </section>

            {/* With Click Handlers */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Interactive Examples</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:bell"
                        pattern="primary"
                        onClick={() => alert('Notification clicked!')}
                    />
                    <IconButton
                        icon="mdi:email"
                        pattern="brand-primary"
                        onClick={() => alert('Email clicked!')}
                    />
                    <IconButton
                        icon="mdi:cog"
                        pattern="brand-inverted"
                        onClick={() => alert('Settings clicked!')}
                    />
                </div>
            </section>

            {/* Controlled State Demo */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Controlled States</h2>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="default"
                        />
                        <span className="text-xs">Default</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="hovered"
                        />
                        <span className="text-xs">Hovered</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="pressed"
                        />
                        <span className="text-xs">Pressed</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="focused"
                        />
                        <span className="text-xs">Focused</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            disabled
                        />
                        <span className="text-xs">Disabled</span>
                    </div>
                </div>
            </section>

            {/* Dropdown Items Section */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-8 mt-12">DropdownItemGroup Examples</h1>

                {/* Basic Dropdown Items */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Basic Dropdown Menu (Uncontrolled)</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            items={[
                                {
                                    id: "profile",
                                    text: "Profile",
                                    icon: "mdi:account",
                                    onClick: () => console.log('Profile clicked')
                                },
                                {
                                    id: "settings",
                                    text: "Settings",
                                    icon: "mdi:cog",
                                    onClick: () => console.log('Settings clicked')
                                },
                                {
                                    id: "help",
                                    text: "Help Center",
                                    icon: "mdi:help-circle",
                                    onClick: () => console.log('Help clicked')
                                },
                                {
                                    id: "signout",
                                    text: "Sign Out",
                                    icon: "mdi:logout",
                                    onClick: () => console.log('Sign out clicked')
                                }
                            ]}
                            onSelectionChange={(id) => console.log('Selected:', id)}
                            canClearSelected
                        />
                    </div>
                </div>

                {/* Language */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Language</h2>
                    <DropdownItemGroup
                        items={[
                            {
                                id: "Thailand",
                                text: "Thailand",
                            },
                            {
                                id: "Japanese",
                                text: "Japanese",
                            },
                            {
                                id: "Korean",
                                text: "Korean",
                            },
                            {
                                id: "United States",
                                text: "United States",
                            },
                            {
                                id: "Ukraine",
                                text: "Ukraine",
                            }
                        ]}
                        className="w-[288px]"
                        groupLabel="All Languages"
                        onSelectionChange={(id) => console.log('Selected:', id)}
                    />
                </div>

                {/* Dropdown with States */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Different States</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            items={[
                                {
                                    text: "Default State",
                                    icon: "mdi:circle",
                                    state: "default"
                                },
                                {
                                    text: "Hovered State",
                                    icon: "mdi:circle",
                                    state: "hovered"
                                },
                                {
                                    text: "Pressed State",
                                    icon: "mdi:circle",
                                    state: "pressed"
                                },
                                {
                                    text: "Focused State",
                                    icon: "mdi:circle",
                                    state: "focused"
                                },
                                {
                                    text: "Disabled State",
                                    icon: "mdi:circle",
                                    disabled: true
                                }
                            ]}
                        />
                    </div>
                </div>

                {/* Menu with Icons */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">File Menu Example</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            items={[
                                {
                                    text: "New File",
                                    icon: "mdi:file-plus",
                                    onClick: () => alert('New file')
                                },
                                {
                                    text: "Open File",
                                    icon: "mdi:folder-open",
                                    onClick: () => alert('Open file')
                                },
                                {
                                    text: "Save",
                                    icon: "mdi:content-save",
                                    onClick: () => alert('Save')
                                },
                                {
                                    text: "Export",
                                    icon: "mdi:export",
                                    onClick: () => alert('Export')
                                },
                                {
                                    text: "Print",
                                    icon: "mdi:printer",
                                    disabled: true
                                }
                            ]}
                        />
                    </div>
                </div>

                {/* Without Icons */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Text Only Menu</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            items={[
                                { text: "Edit Profile" },
                                { text: "Account Settings" },
                                { text: "Privacy" },
                                { text: "Help & Support" }
                            ]}
                        />
                    </div>
                </div>

                {/* With Group Labels */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Grouped Menu with Labels</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            groupLabel="Account"
                            items={[
                                {
                                    id: "profile",
                                    text: "Profile",
                                    icon: "mdi:account",
                                    onClick: () => console.log('Profile')
                                },
                                {
                                    id: "settings",
                                    text: "Settings",
                                    icon: "mdi:cog",
                                    onClick: () => console.log('Settings')
                                }
                            ]}
                        />
                        <div className="border-t my-2"></div>
                        <DropdownItemGroup
                            groupLabel="Support"
                            items={[
                                {
                                    id: "help",
                                    text: "Help Center",
                                    icon: "mdi:help-circle",
                                    onClick: () => console.log('Help')
                                },
                                {
                                    id: "contact",
                                    text: "Contact Us",
                                    icon: "mdi:email",
                                    onClick: () => console.log('Contact')
                                }
                            ]}
                        />
                        <div className="border-t my-2"></div>
                        <DropdownItemGroup
                            items={[
                                {
                                    id: "signout",
                                    text: "Sign Out",
                                    icon: "mdi:logout",
                                    onClick: () => console.log('Sign out')
                                }
                            ]}
                        />
                    </div>
                </div>

                {/* Controlled Selection Example */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Controlled Selection (Language)</h2>
                    <p className="text-sm text-gray-600 mb-2">Selected: <span className="font-bold">{selectedLanguage || 'None'}</span></p>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            selectedId={selectedLanguage}
                            onSelectionChange={setSelectedLanguage}
                            canClearSelected={true}
                            items={[
                                {
                                    id: "en",
                                    text: "English",
                                    icon: "circle-flags:us"
                                },
                                {
                                    id: "th",
                                    text: "ไทย",
                                    icon: "circle-flags:th"
                                },
                                {
                                    id: "jp",
                                    text: "日本語",
                                    icon: "circle-flags:jp"
                                },
                                {
                                    id: "kr",
                                    text: "한국어",
                                    icon: "circle-flags:kr"
                                }
                            ]}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">canClearSelected: true (กดซ้ำเพื่อยกเลิกการเลือก)</p>
                </div>

                {/* Cannot Clear Selection Example */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Always Selected (Theme)</h2>
                    <p className="text-sm text-gray-600 mb-2">Selected: <span className="font-bold">{selectedTheme}</span></p>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            selectedId={selectedTheme}
                            onSelectionChange={setSelectedTheme}
                            canClearSelected={false}
                            items={[
                                {
                                    id: "light",
                                    text: "Light Mode",
                                    icon: "mdi:white-balance-sunny"
                                },
                                {
                                    id: "dark",
                                    text: "Dark Mode",
                                    icon: "mdi:moon-waning-crescent"
                                },
                                {
                                    id: "auto",
                                    text: "Auto",
                                    icon: "mdi:theme-light-dark"
                                }
                            ]}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">canClearSelected: false (ต้องมีการเลือกอยู่เสมอ)</p>
                </div>

                {/* Default Selected Example */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">With Default Selected</h2>
                    <div className="w-60 bg-white border rounded-lg p-2 shadow-lg">
                        <DropdownItemGroup
                            defaultSelectedId="medium"
                            onSelectionChange={(id) => console.log('Size selected:', id)}
                            canClearSelected={false}
                            items={[
                                {
                                    id: "small",
                                    text: "Small",
                                    icon: "mdi:size-s"
                                },
                                {
                                    id: "medium",
                                    text: "Medium",
                                    icon: "mdi:size-m"
                                },
                                {
                                    id: "large",
                                    text: "Large",
                                    icon: "mdi:size-l"
                                },
                                {
                                    id: "xlarge",
                                    text: "Extra Large",
                                    icon: "mdi:size-xl"
                                }
                            ]}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">defaultSelectedId: &quot;medium&quot;</p>
                </div>

                {/* DropdownInput Section */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold mb-8 mt-12">DropdownInput Examples</h1>
                    
                    {/* Primary Pattern - Size 48 */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Primary Pattern (Size 48)</h2>
                        <div className="max-w-md">
                            <DropdownInput
                                pattern="primary"
                                size={48}
                                placeholder="Select a country"
                                selectedId={selectedCountry}
                                onSelectionChange={setSelectedCountry}
                                searchable
                                groupLabel="test"
                                canClearSelected={true}
                                items={[
                                    {
                                        id: "thailand",
                                        text: "Thailand",
                                        icon: "circle-flags:th"
                                    },
                                    {
                                        id: "japan",
                                        text: "Japan",
                                        icon: "circle-flags:jp"
                                    },
                                    {
                                        id: "korea",
                                        text: "Korea",
                                        icon: "circle-flags:kr"
                                    },
                                    {
                                        id: "united-states",
                                        text: "United States",
                                        icon: "circle-flags:us"
                                    },
                                    {
                                        id: "ukraine",
                                        text: "Ukraine",
                                        icon: "circle-flags:ua"
                                    }
                                ]}
                            />
                            <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-bold">{selectedCountry || 'None'}</span></p>
                        </div>
                    </div>

                    {/* Secondary Pattern - Size 48 */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Secondary Pattern (Size 48)</h2>
                        <div className="max-w-md">
                            <DropdownInput
                                pattern="secondary"
                                size={48}
                                placeholder="Select a font"
                                selectedId={selectedFont}
                                onSelectionChange={setSelectedFont}
                                canClearSelected={false}
                                items={[
                                    {
                                        id: "roboto",
                                        text: "Roboto",
                                        icon: "mdi:format-text"
                                    },
                                    {
                                        id: "opensans",
                                        text: "Open Sans",
                                        icon: "mdi:format-text"
                                    },
                                    {
                                        id: "lato",
                                        text: "Lato",
                                        icon: "mdi:format-text"
                                    },
                                    {
                                        id: "montserrat",
                                        text: "Montserrat",
                                        icon: "mdi:format-text"
                                    }
                                ]}
                            />
                            <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-bold">{selectedFont}</span></p>
                        </div>
                    </div>

                    {/* Tertiary Pattern - Size 48 */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Tertiary Pattern (Size 48)</h2>
                        <div className="max-w-md">
                            <DropdownInput
                                pattern="tertiary"
                                size={48}
                                placeholder="Select a color"
                                selectedId={selectedColor}
                                onSelectionChange={setSelectedColor}
                                canClearSelected={true}
                                items={[
                                    {
                                        id: "red",
                                        text: "Red",
                                        icon: "mdi:circle"
                                    },
                                    {
                                        id: "blue",
                                        text: "Blue",
                                        icon: "mdi:circle"
                                    },
                                    {
                                        id: "green",
                                        text: "Green",
                                        icon: "mdi:circle"
                                    },
                                    {
                                        id: "yellow",
                                        text: "Yellow",
                                        icon: "mdi:circle"
                                    }
                                ]}
                            />
                            <p className="text-sm text-gray-600 mt-2">Selected: <span className="font-bold">{selectedColor || 'None'}</span></p>
                        </div>
                    </div>

                    {/* Size Comparison */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Size Comparison</h2>
                        <div className="space-y-4 max-w-md">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Size 36 (Primary)</p>
                                <DropdownInput
                                    pattern="primary"
                                    size={36}
                                    placeholder="Select size 36"
                                    items={[
                                        {
                                            id: "opt1",
                                            text: "Option 1",
                                            icon: "mdi:star"
                                        },
                                        {
                                            id: "opt2",
                                            text: "Option 2",
                                            icon: "mdi:star"
                                        }
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Size 48 (Primary)</p>
                                <DropdownInput
                                    pattern="primary"
                                    size={48}
                                    placeholder="Select size 48"
                                    items={[
                                        {
                                            id: "opt1",
                                            text: "Option 1",
                                            icon: "mdi:star"
                                        },
                                        {
                                            id: "opt2",
                                            text: "Option 2",
                                            icon: "mdi:star"
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* All States Demo */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">State Variations (Secondary Pattern)</h2>
                        <div className="space-y-4 max-w-md">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Default</p>
                                <DropdownInput
                                    searchable
                                    pattern="secondary"
                                    state="default"
                                    placeholder="Default state"
                                    items={[{ id: "1", text: "Option 1" }]}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Hovered</p>
                                <DropdownInput
                                    pattern="secondary"
                                    state="hovered"
                                    placeholder="Hovered state"
                                    items={[{ id: "1", text: "Option 1" }]}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pressed</p>
                                <DropdownInput
                                    pattern="secondary"
                                    state="pressed"
                                    placeholder="Pressed state"
                                    items={[{ id: "1", text: "Option 1" }]}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Focused</p>
                                <DropdownInput
                                    pattern="secondary"
                                    state="focused"
                                    placeholder="Focused state"
                                    items={[{ id: "1", text: "Option 1" }]}
                                />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Disabled</p>
                                <DropdownInput
                                    pattern="secondary"
                                    disabled
                                    placeholder="Disabled state"
                                    items={[{ id: "1", text: "Option 1" }]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Example */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Scrollable (8+ Items)</h2>
                        <div className="max-w-md">
                            <DropdownInput
                                pattern="tertiary"
                                placeholder="Select a programming language"
                                searchable
                                items={[
                                    { id: "js", text: "JavaScript", icon: "vscode-icons:file-type-js" },
                                    { id: "ts", text: "TypeScript", icon: "vscode-icons:file-type-typescript" },
                                    { id: "py", text: "Python", icon: "vscode-icons:file-type-python" },
                                    { id: "java", text: "Java", icon: "vscode-icons:file-type-java" },
                                    { id: "go", text: "Go", icon: "vscode-icons:file-type-go" },
                                    { id: "rust", text: "Rust", icon: "vscode-icons:file-type-rust" },
                                    { id: "cpp", text: "C++", icon: "vscode-icons:file-type-cpp" },
                                    { id: "ruby", text: "Ruby", icon: "vscode-icons:file-type-ruby" }
                                ]}
                            />
                            <p className="text-xs text-gray-500 mt-2">แสดงสูงสุด 5 items, scroll เพื่อดูเพิ่มเติม</p>
                        </div>
                    </div>

                </section>
            </section>
        </div>
    );
}