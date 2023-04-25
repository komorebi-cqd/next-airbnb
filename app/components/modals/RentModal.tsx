'use client';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { categories } from "../Navbar/Categories";

import useRentModal from "@/app/hooks/useRentModal"

import Modal from "./Modal"
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import CountrySelect from "../Inputs/CountrySelect";
import Counter from "../Inputs/Counter";
import dynamic from "next/dynamic";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1, //客人数量
            roomCount: 1,//房间数量
            bathroomCount: 1, //厕所数量
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });


    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    };

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        };

        setIsLoading(true);

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('创建成功!');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY)
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('发生了一些错误');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return '创建'
        };
        return '下一步';
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return '上一步';
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-10">
            <Heading title="以下哪一个最能描述你的地方?" subTitle="选择一个类别" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1 ">
                        <CategoryInput onClick={(category) => setCustomValue('category', category)} selected={category === item.label} icon={item.icon} label={item.label} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="您的房子在哪？" subTitle="选择地址可以帮助客户找到您！" />
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="分享关于您房子的一些基础信息" subTitle="你有什么便利设施吗？" />
                <Counter title="客人" subtitle="您能准许几位客人入住？" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} />
                <Counter title="房间" subtitle="您有多少间房间？" value={roomCount} onChange={(value) => setCustomValue('roomCount', value)} />
                <Counter title="浴室" subtitle="您有几间浴室？" value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)} />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="为您的地方添加一张照片"
                    subTitle="向客人展示您的住处!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="你会如何描述你的位置?"
                    subTitle="短而优美的描述更好!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="现在，设置您的价格"
                    subTitle="你每晚收费多少?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSumbit={handleSubmit(onSubmit)}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            actionLabel={actionLabel}
            body={bodyContent}
            title="出租您的房子！"
        />
    )
}

export default RentModal
