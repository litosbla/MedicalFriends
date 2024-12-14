"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


type formIntralaboralProps = {
    titulo: string;
    onHitSubmit: (data: any) => void 
    surveyData: SurveyData;
    scaleOptions: ScaleOption[];
}

interface Question {
    id: string;
    number: number;
    text: string;
    isConditional?: boolean;
    conditionalOptions?: Array<{
        value: string;
        label: string;
    }>;
}

interface ScaleOption {
    value: string;
    label: string;
}

interface Section {
    title: string;
    questions: Question[];
    isConditionalSection?: boolean;
    requiresClientService?: boolean;
}

interface SurveyData {
    sections: Section[];
}

type Answers = Record<string, string>;

const FormCustom = ({ onHitSubmit, titulo, scaleOptions, surveyData }: formIntralaboralProps) => {
    const [answers, setAnswers] = useState<Answers>({});
    const [currentSection, setCurrentSection] = useState(0);
    const [showClientSections, setShowClientSections] = useState<boolean | null>(null);

    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));

    };

    // Filtrar secciones basado en la respuesta de atención a clientes
    const filteredSections = useMemo(() => {
        return surveyData.sections.filter(section => {
            if (section.requiresClientService) {
                return answers['clientService'] === 'si';
            }
            return true;
        });
    }, [surveyData.sections, answers]);

    const isCurrentSectionComplete = useMemo(() => {
        const currentQuestions = filteredSections[currentSection].questions;
        return currentQuestions.every((question: Question) => {
            const answer = answers[question.id];
            return answer !== undefined && answer !== "";
        });
    }, [answers, currentSection, filteredSections]);

    const handleSubmitSection = () => {
        if (!isCurrentSectionComplete) {
            return;
        }

        if (currentSection < filteredSections.length - 1) {
            setCurrentSection(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            onHitSubmit(answers);
        }
    };

    const currentProgress = ((currentSection + 1) / filteredSections.length) * 100;
    const currentSectionData = filteredSections[currentSection];

    // const isClientServiceQuestion = currentSectionData.questions.some(q => q.number === 105);
    // const shouldShowClientQuestion = isClientServiceQuestion && !showClientSections;

    const unansweredQuestions = useMemo(() => {
        return currentSectionData.questions.filter((question: Question) => {
            const answer = answers[question.id];
            return answer === undefined || answer === "";
        }).map(q => q.number);
    }, [answers, currentSectionData.questions]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
            <Progress value={currentProgress} className="w-full" />
            <h1 className="text-2xl font-bold text-center mb-6 text-black">
                {titulo}
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-green-600">
                        {currentSectionData.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {currentSectionData.questions.map((question) => (
                        <div key={question.id} className="space-y-4 p-4 border rounded-lg">
                            <p className="font-medium">
                                {question.number % 1 === 0 ? `${question.number}. ` : ''}{question.text}
                            </p>
                            <RadioGroup
                                value={answers[question.id] || ""}
                                onValueChange={(value) => handleAnswerChange(question.id, value)}
                                className={`grid ${question.isConditional ? 'grid-cols-2' : 'grid-cols-5'} gap-2`}
                            >
                                {question.isConditional
                                    ? question.conditionalOptions?.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={option.value}
                                                id={`${question.id}-${option.value}`}
                                            />
                                            <Label htmlFor={`${question.id}-${option.value}`}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))
                                    : scaleOptions.map((option) => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={option.value}
                                                id={`${question.id}-${option.value}`}
                                            />
                                            <Label htmlFor={`${question.id}-${option.value}`}>
                                                {option.label}
                                            </Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                    ))}

                    {!isCurrentSectionComplete && (
                        <div className="text-red-500 text-sm mt-4">
                            Por favor responda todas las preguntas antes de continuar.
                            {unansweredQuestions.length > 0 && (
                                <p>Preguntas pendientes: {unansweredQuestions.join(', ')}</p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        {currentSection > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => setCurrentSection(prev => prev - 1)}
                            >
                                Anterior
                            </Button>
                        )}
                        <Button
                            onClick={handleSubmitSection}
                            className="ml-auto"
                            disabled={!isCurrentSectionComplete}
                        >
                            {currentSection === filteredSections.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FormCustom;