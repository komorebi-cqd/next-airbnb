'use client'
import Select from "react-select";

import useCountries from "@/app/hooks/useCountries"

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (valeu: CountrySelectValue) => void
}


const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll, getByValue } = useCountries();


    return (
        <div>
            <Select
                placeholder="选择地方"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>{option.label},<span className="ml-1 text-neutral-500">{option.region}</span></div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    )
}

export default CountrySelect