'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";
import CountrySelect, {
    CountrySelectValue
} from "../Inputs/CountrySelect";
import Heading from '../Heading';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();

    const [step, setStep] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    },
        [
            step,
            searchModal,
            location,
            router,
            guestCount,
            roomCount,
            dateRange,
            onNext,
            bathroomCount,
            params
        ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="您想去哪?"
                subTitle="找个完美的位置!"
            />
            <CountrySelect
                value={location}
                onChange={(value) =>
                    setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="您计划什么时候去?"
                    subTitle="确保每个人都有时间!"
                />
                <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="更多的信息"
                />
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="客人"
                    subtitle="有多少个人?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="房间"
                    subtitle="您需要多少个房间?"
                />
                <hr />
                <Counter
                    onChange={(value) => {
                        setBathroomCount(value)
                    }}
                    value={bathroomCount}
                    title="浴室"
                    subtitle="您需要多少间浴室?"
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            title="Filters"
            actionLabel={actionLabel}
            onSumbit={onSubmit}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    );
}

export default SearchModal;