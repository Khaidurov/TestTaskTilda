<?php
// Задача 1: лесенка

declare(strict_types=1);

const START_NUMBER = 1;
const END_NUMBER = 100;
const START_STEP = 1;

$stepLimit = START_STEP;
$currentStep = 0;
$number = START_NUMBER;

while ($number <= END_NUMBER) {
    if ($stepLimit > $currentStep) {
        echo ' ' . str_pad(strval($number), 3, ' ', STR_PAD_LEFT);
        $number++;
        $currentStep++;
    } else {
        $currentStep = 0;
        $stepLimit++;
        echo PHP_EOL;
    }
}
echo PHP_EOL;