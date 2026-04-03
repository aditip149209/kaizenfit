import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { showToast } from "../lib/toast";
import WaterModal from "./WaterModal";
import FuelModal, { FuelData } from "./FuelModal";
import RoutineModal, { RoutineData } from "./RoutineModal";
import ExerciseModal, { ExerciseData } from "./ExerciseModal";
import DietPlanModal, { DietPlanData } from "./DietPlanModal";
import ReportModal, { JournalHistoryItem, ReportData, ReportPreviewData, SavedReportDetail } from "./ReportModal";
import MetricsModal, { MetricsData } from "./MetricsModal";
// Reusable Button Component for consistent style
const NeoButton = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <button onClick={onClick} className={`bg-black text-white font-heading uppercase text-sm py-1 px-6 rounded shadow-neo hover:shadow-none transition-all border-2 border-transparent ${className}`}>
    {children}
  </button>
);

// Reusable Card Component to define the structure and style
const DashboardCard = ({ title, children, className = "", headerClassName = "" }: { title: string; children: React.ReactNode; className?: string; headerClassName?: string }) => (
  <div className={`flex flex-col border-3 border-kaizen-black overflow-hidden ${className}`}>
    <div className={`bg-kaizen-mint py-3 px-4 border-b-3 border-kaizen-black text-center ${headerClassName}`}>
      <h2 className="font-heading uppercase font-bold text-xl tracking-tight">
        {title}
      </h2>
    </div>
    <div className="p-2 flex flex-col h-full">
      {children}
    </div>
  </div>
);

export default function DashboardMain() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const HYDRATION_PAGE_SIZE = 24;
  const METRICS_HISTORY_SIZE = 5;
  const METRICS_FETCH_SIZE = 60;
  // Get the username from the email (e.g., "aditi" from "aditi@gmail.com")
  const username = user?.email?.split('@')[0].toUpperCase() || "USER";

  // --- HYDRATION STATE ---
  const [todayWaterLevel, setTodayWaterLevel] = useState(0);
  const [waterHeatmap, setWaterHeatmap] = useState<Array<{ date: string; amount: number }>>([]);
  const [selectedWaterEntry, setSelectedWaterEntry] = useState<{ date: string; amount: number } | null>(null);
  const [waterPage, setWaterPage] = useState(0);
  const [hydrationReloadToken, setHydrationReloadToken] = useState(0);
  const [waterGoal, setWaterGoal] = useState(3000);   // Goal in ml
  const [calorieGoal, setCalorieGoal] = useState<number | null>(null);
  const [waterGoalRecordId, setWaterGoalRecordId] = useState<string | null>(null);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [waterModalMode, setWaterModalMode] = useState<'LOG' | 'GOAL'>('LOG');

  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isDietPlanModalOpen, setIsDietPlanModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState<any[]>([]);
  const [exerciseOptions, setExerciseOptions] = useState<any[]>([]);
  const [routineOptions, setRoutineOptions] = useState<any[]>([]);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  const [latestMetrics, setLatestMetrics] = useState<any>(null);
  const [todayHealthRecord, setTodayHealthRecord] = useState<any>(null);
  const [metricsReloadToken, setMetricsReloadToken] = useState(0);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  const [mentalStateDraft, setMentalStateDraft] = useState({
    sleepHours: '',
  });
  const [macroProgress, setMacroProgress] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
  });
  const [exerciseSeedName, setExerciseSeedName] = useState('');
  const [reopenRoutineAfterExercise, setReopenRoutineAfterExercise] = useState(false);

  const dateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatHydrationDate = (dateString: string) => {
    const parsedDate = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return dateString;
    }

    return parsedDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWindowDays = (page: number) => {
    const newest = new Date();
    newest.setHours(0, 0, 0, 0);
    newest.setDate(newest.getDate() - (page * HYDRATION_PAGE_SIZE));

    return Array.from({ length: HYDRATION_PAGE_SIZE }).map((_, index) => {
      const day = new Date(newest);
      day.setDate(newest.getDate() - index);
      return dateKey(day);
    });
  };

  const buildMetricChartPath = (points: Array<{ x: number; y: number }>, closeShape: boolean) => {
    if (points.length === 0) {
      return '';
    }

    const linePath = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
      .join(' ');

    if (!closeShape) {
      return linePath;
    }

    if (points.length === 1) {
      return `${linePath} L100,100 L0,100 Z`;
    }

    return `${linePath} L100,100 L0,100 Z`;
  };

  useEffect(() => {
    let active = true;

    const loadHydrationState = async () => {
      if (!user) {
        return;
      }

      try {
        const windowDays = getWindowDays(waterPage);
        const newestDay = windowDays[0];
        const oldestDay = windowDays[windowDays.length - 1];

        const [goalResponse, waterResponse] = await Promise.all([
          api.get('/health/goals/current'),
          api.get('/nutrition/water', { params: { from: oldestDay, to: newestDay, limit: 500, offset: 0 } }),
        ]);

        const goalRecord = goalResponse.data;
        const waterEntries = waterResponse.data?.rows ?? [];
        const totalsByDay = waterEntries.reduce((acc: Record<string, number>, entry: { date?: string; amount?: number }) => {
          const key = String(entry.date ?? '').slice(0, 10);
          if (!key) {
            return acc;
          }

          acc[key] = (acc[key] ?? 0) + Number(entry.amount ?? 0);
          return acc;
        }, {});

        const heatmapRows = windowDays.map((day) => ({
          date: day,
          amount: Math.max(0, Math.round(totalsByDay[day] ?? 0)),
        }));

        const todayKey = dateKey(new Date());
        const todayAmount = heatmapRows.find((row) => row.date === todayKey)?.amount ?? 0;

        if (!active) {
          return;
        }

        setTodayWaterLevel(todayAmount);
        setWaterHeatmap(heatmapRows);
        setSelectedWaterEntry((current) => {
          if (!current) {
            return heatmapRows[0] ?? null;
          }

          return heatmapRows.find((row) => row.date === current.date) ?? heatmapRows[0] ?? null;
        });
        setWaterGoal(goalRecord?.waterGoal ?? 3000);
        setCalorieGoal(goalRecord?.calorieGoal ?? null);
        setWaterGoalRecordId(goalRecord?.id ?? null);
      } catch (error) {
        console.error('Failed to load hydration state:', error);
      }
    };

    loadHydrationState();

    return () => {
      active = false;
    };
  }, [user, waterPage, hydrationReloadToken]);

  useEffect(() => {
    let active = true;

    const loadDashboardData = async () => {
      if (!user) {
        return;
      }

      try {
        const today = dateKey(new Date());
        const [workoutLogsResponse, workoutPlansResponse, exerciseResponse, healthDataResponse, todayHealthResponse, mealLogsResponse] = await Promise.all([
          api.get('/workouts/logs', { params: { limit: 10, offset: 0 } }),
          api.get('/workouts/user-plans', { params: { limit: 20, offset: 0 } }),
          api.get('/workouts/exercises', { params: { limit: 100, offset: 0 } }),
          api.get('/health/data', { params: { limit: METRICS_FETCH_SIZE, offset: 0 } }),
          api.get('/health/data', { params: { from: today, to: today, limit: 1, offset: 0 } }),
          api.get('/nutrition/meals', { params: { from: today, to: today, limit: 200, offset: 0 } }),
        ]);

        if (!active) {
          return;
        }

        setWorkoutLogs(workoutLogsResponse.data?.rows ?? []);
        setExerciseOptions(exerciseResponse.data?.rows ?? []);
        const planRows = workoutPlansResponse.data?.rows ?? [];
        setRoutineOptions(planRows);
        setSelectedRoutineId((current) => {
          if (current && planRows.some((plan: any) => plan.id === current)) {
            return current;
          }

          return planRows[0]?.id ?? null;
        });

        const healthRows = healthDataResponse.data?.rows ?? [];
        const latestWeightRecord = healthRows.find((row: any) => Number.isFinite(Number(row?.weight)) && Number(row?.weight) > 0) ?? null;
        setLatestMetrics(latestWeightRecord);
        setMetricsHistory(healthRows);

        const todayHealth = (todayHealthResponse.data?.rows ?? [])[0] ?? null;
        setTodayHealthRecord(todayHealth);
        setMentalStateDraft({
          sleepHours: todayHealth?.sleepHours != null ? String(todayHealth.sleepHours) : '',
        });

        const mealRows = mealLogsResponse.data?.rows ?? [];
        const totals = mealRows.reduce(
          (acc: { protein: number; carbs: number; fats: number }, log: any) => {
            const quantity = Number(log.quantity ?? 1);
            const food = log.FoodItem ?? {};
            acc.protein += Number(food.protein ?? 0) * quantity;
            acc.carbs += Number(food.carbs ?? 0) * quantity;
            acc.fats += Number(food.fat ?? 0) * quantity;
            return acc;
          },
          { protein: 0, carbs: 0, fats: 0 }
        );

        setMacroProgress({
          protein: Math.min(100, Math.round((totals.protein / 180) * 100)),
          fats: Math.min(100, Math.round((totals.fats / 80) * 100)),
          carbs: Math.min(100, Math.round((totals.carbs / 300) * 100)),
        });
      } catch (error) {
        console.error('Failed to load dashboard workout data:', error);
      }
    };

    loadDashboardData();

    return () => {
      active = false;
    };
  }, [user, metricsReloadToken]);

  // Handle Modal Submission
  const handleWaterSubmit = async (value: number) => {
    try {
      if (waterModalMode === 'LOG') {
        if (value === 0) {
          setIsWaterModalOpen(false);
          return;
        }

        await api.post('/nutrition/water', {
          date: dateKey(new Date()),
          amount: value,
        });

        showToast.success(`Hydration logged: +${value}ml`);
        setHydrationReloadToken((prev) => prev + 1);
      } else {
        const payload = { waterGoal: value, calorieGoal, date: dateKey(new Date()) };

        if (waterGoalRecordId) {
          await api.patch(`/health/goals/${waterGoalRecordId}`, payload);
          showToast.success(`Water goal updated: ${value}ml`);
        } else {
          const response = await api.post('/health/goals', payload);
          setWaterGoalRecordId(response.data?.goal?.id ?? response.data?.id ?? null);
          showToast.success(`Water goal set: ${value}ml`);
        }

        setWaterGoal(value);
        setHydrationReloadToken((prev) => prev + 1);
      }
      setIsWaterModalOpen(false);
    } catch (error) {
      console.error('Failed to save water entry:', error);
      showToast.error('Failed to save. Try again.');
    }
  };

  const handleFuelLog = (fuel: FuelData) => {
    api.post('/nutrition/foods', {
      name: fuel.name,
      calories: fuel.calories,
      protein: fuel.protein,
      carbs: fuel.carbs,
      fat: fuel.fats,
      servingUnit: 'piece',
      servingSize: 1,
    }).then((response) => {
      return api.post('/nutrition/meals', {
        date: dateKey(new Date()),
        mealType: fuel.meal === 'snacks' ? 'snack' : fuel.meal,
        quantity: 1,
        foodItemId: response.data?.foodItem?.id ?? response.data?.id,
      });
    }).then(() => {
      showToast.success(`Meal logged: ${fuel.name}`);
    }).catch((error) => {
      console.error('Failed to log fuel:', error);
      showToast.error('Failed to log meal. Try again.');
    });
  };

  const handleRoutineCreate = (routine: RoutineData) => {
    api.post('/workouts/user-plans', {
      name: routine.name,
      description: routine.description,
      duration: routine.duration,
      exercises: routine.exercises,
    }).then((response) => {
      const createdRoutine = response.data?.workoutPlan ?? null;
      if (createdRoutine) {
        setRoutineOptions((prev) => [createdRoutine, ...prev]);
        setSelectedRoutineId(createdRoutine.id ?? null);
      }
      showToast.success(`Routine created: ${routine.name}`);
    }).catch((error) => {
      console.error('Failed to save routine:', error);
      showToast.error('Failed to create routine. Try again.');
    });
  };

  const openAddExerciseFromRoutine = (prefillName: string) => {
    setExerciseSeedName(prefillName);
    setReopenRoutineAfterExercise(true);
    setIsRoutineModalOpen(false);
    setIsExerciseModalOpen(true);
  };

  const handleExerciseCreate = (exercise: ExerciseData) => {
    api.post('/workouts/exercises', {
      name: exercise.name,
      description: exercise.notes,
      exerciseType: 'Strength',
      targetMuscleGroup: 'FullBody',
    }).then((response) => {
      const createdExercise = response.data?.exercise;

      if (createdExercise?.id && createdExercise?.name) {
        setExerciseOptions((prev) => {
          if (prev.some((item) => item.id === createdExercise.id)) {
            return prev;
          }

          return [...prev, { id: createdExercise.id, name: createdExercise.name }];
        });
      }

      showToast.success(`Exercise added: ${exercise.name}`);
      setIsExerciseModalOpen(false);

      if (reopenRoutineAfterExercise) {
        setIsRoutineModalOpen(true);
      }

      setReopenRoutineAfterExercise(false);
    }).catch((error) => {
      console.error('Failed to create exercise:', error);
      showToast.error('Failed to add exercise. Try again.');
    });
  };

  const handleMarkRoutineCompleted = async () => {
    if (!selectedRoutine?.id) {
      showToast.warning('Select a routine first');
      return;
    }

    try {
      const exerciseEntries = selectedRoutineDetails.exercises
        .map((exerciseName: string) => {
          const match = exerciseOptions.find(
            (exercise) => String(exercise.name).toLowerCase() === String(exerciseName).toLowerCase()
          );

          if (!match?.id) {
            return null;
          }

          return {
            exerciseId: match.id,
            sets: null,
            reps: null,
            weight: null,
            duration: null,
          };
        })
        .filter(Boolean);

      await api.post('/workouts/logs', {
        date: new Date().toISOString(),
        userWorkoutId: selectedRoutine.id,
        notes: `Completed routine: ${selectedRoutine.name}`,
        exerciseEntries,
      });

      setMetricsReloadToken((prev) => prev + 1);
      showToast.success('Workout marked as completed');
    } catch (error) {
      console.error('Failed to mark workout complete:', error);
      showToast.error('Failed to mark routine completed. Try again.');
    }
  };

  const parseRoutineDescription = (routine: any) => {
    if (!routine?.description) {
      return { description: '', duration: null as number | null, difficulty: null as string | null, exercises: [] as string[] };
    }

    if (typeof routine.description === 'string') {
      try {
        const parsed = JSON.parse(routine.description);
        return {
          description: parsed?.description ?? '',
          duration: parsed?.duration ?? null,
          difficulty: parsed?.difficulty ?? null,
          exercises: Array.isArray(parsed?.exercises) ? parsed.exercises : [],
        };
      } catch {
        return { description: routine.description, duration: null, difficulty: null, exercises: [] };
      }
    }

    return {
      description: String(routine.description ?? ''),
      duration: null,
      difficulty: null,
      exercises: [],
    };
  };

  const selectedRoutine = routineOptions.find((routine) => routine.id === selectedRoutineId) ?? routineOptions[0] ?? null;
  const selectedRoutineDetails = parseRoutineDescription(selectedRoutine);
  const connectedTrackers: Array<{ id: string; name: string; provider: string; syncedAt: string }> = [];

  const handleDietPlanCreate = (plan: DietPlanData) => {
    api.post('/nutrition/user-diet-plans', {
      name: plan.name,
      goal: plan.goal,
      calorieTarget: plan.calorieTarget,
      proteinTarget: plan.proteinTarget,
      carbsTarget: plan.carbsTarget,
      fatsTarget: plan.fatsTarget,
      notes: plan.notes,
    }).then(() => {
      showToast.success(`Diet plan created: ${plan.name}`);
    }).catch((error) => {
      console.error('Failed to save diet plan:', error);
      showToast.error('Failed to create diet plan. Try again.');
    });
  };

  const parseReportRequest = (content: string) => {
    try {
      const parsed = JSON.parse(content || '{}');
      return {
        reportType: String(parsed.reportType ?? 'weekly'),
        includeMetrics: Boolean(parsed.includeMetrics),
        includeNutrition: Boolean(parsed.includeNutrition),
        includeWorkouts: Boolean(parsed.includeWorkouts),
      };
    } catch {
      return {
        reportType: 'weekly',
        includeMetrics: false,
        includeNutrition: false,
        includeWorkouts: false,
      };
    }
  };

  const handleReportGenerate = async (report: ReportData): Promise<ReportPreviewData> => {
    try {
      const [previewResponse, journalResponse] = await Promise.all([
        api.post('/health/reports/preview', {
          reportType: report.reportType,
          includeMetrics: report.includeMetrics,
          includeNutrition: report.includeNutrition,
          includeWorkouts: report.includeWorkouts,
        }),
        api.post('/health/journals/request', {
          reportType: report.reportType,
          includeMetrics: report.includeMetrics,
          includeNutrition: report.includeNutrition,
          includeWorkouts: report.includeWorkouts,
        }),
      ]);

      const payload = previewResponse.data?.payload;
      const reportText = String(previewResponse.data?.reportText ?? '');
      const journalId = String(journalResponse.data?.journal?.id ?? '');

      if (!journalId || !reportText) {
        throw new Error('Invalid report preview response');
      }

      const sections = Object.keys(payload?.data ?? {});
      showToast.success(`Report preview ready (${sections.length} sections)`);

      return {
        journalId,
        reportType: report.reportType,
        reportText,
        payload,
      };
    } catch (error) {
      console.error('Failed to generate report preview:', error);
      showToast.error('Failed to generate report preview.');
      throw error;
    }
  };

  const handleReportSave = async (preview: ReportPreviewData) => {
    try {
      await api.post('/health/reports/save', {
        journalId: preview.journalId,
        reportType: preview.reportType,
        reportText: preview.reportText,
        payloadMeta: {
          dataWindow: preview.payload?.dataWindow ?? null,
          recordCounts: preview.payload?.recordCounts ?? null,
          filters: preview.payload?.filters ?? null,
        },
      });

      showToast.success('Report saved to history');
    } catch (error) {
      console.error('Failed to save generated report:', error);
      showToast.error('Failed to save report.');
      throw error;
    }
  };

  const loadReportHistory = async (): Promise<JournalHistoryItem[]> => {
    try {
      const response = await api.get('/health/journals', { params: { limit: 30, offset: 0 } });
      const rows = response.data?.rows ?? [];

      return rows.map((row: any) => {
        const request = parseReportRequest(String(row?.content ?? '{}'));
        const reports = Array.isArray(row?.TransformationReports)
          ? row.TransformationReports
          : [];

        return {
          id: String(row.id),
          title: String(row.title ?? 'REPORT REQUEST'),
          createdAt: String(row.createdAt ?? new Date().toISOString()),
          request,
          reports: reports.map((reportRow: any) => ({
            id: String(reportRow.id),
            reportType: String(reportRow.reportType ?? request.reportType),
            content: String(reportRow.content ?? ''),
            createdAt: String(reportRow.createdAt ?? new Date().toISOString()),
          })),
        };
      });
    } catch (error) {
      console.error('Failed to load report history:', error);
      showToast.error('Failed to load report history.');
      throw error;
    }
  };

  const loadSavedReportDetail = async (reportId: string): Promise<SavedReportDetail> => {
    try {
      const response = await api.get(`/health/reports/${reportId}`);
      const report = response.data;
      const journal = report?.TransformationJournal;

      return {
        id: String(report?.id ?? reportId),
        reportType: String(report?.reportType ?? 'weekly'),
        reportText: String(report?.content ?? ''),
        createdAt: String(report?.createdAt ?? new Date().toISOString()),
        journalTitle: journal?.title ? String(journal.title) : undefined,
      };
    } catch (error) {
      console.error('Failed to load saved report detail:', error);
      showToast.error('Failed to load saved report.');
      throw error;
    }
  };

  const handleMetricsLog = (metrics: MetricsData) => {
    api.post('/health/data', {
      date: dateKey(new Date()),
      weight: metrics.weight,
      bodyFat: metrics.bodyFat,
      muscleMass: metrics.muscleMass,
      waist: metrics.waist,
      chest: metrics.chest,
      arms: metrics.arms,
      thighs: metrics.thighs,
      notes: metrics.notes,
    }).then((response) => {
      setLatestMetrics(response.data?.record ?? null);
      setMetricsReloadToken((prev) => prev + 1);
      setIsMetricsModalOpen(false);
      showToast.success(`Metrics logged: ${metrics.weight}kg`);
    }).catch((error) => {
      console.error('Failed to save metrics:', error);
      showToast.error('Failed to save metrics. Try again.');
    });
  };

  const handleMentalStateLog = async () => {
    const date = dateKey(new Date());
    const payload = {
      date,
      sleepHours: mentalStateDraft.sleepHours === '' ? null : Number(mentalStateDraft.sleepHours),
    };

    if (payload.sleepHours == null) {
      showToast.warning('Please enter your sleep hours');
      return;
    }

    try {
      if (todayHealthRecord?.id) {
        await api.patch(`/health/data/${todayHealthRecord.id}`, payload);
        showToast.success(`Sleep logged: ${payload.sleepHours}h`);
      } else {
        await api.post('/health/data', payload);
        showToast.success(`Sleep logged: ${payload.sleepHours}h`);
      }

      setMetricsReloadToken((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to save mental state:', error);
      showToast.error('Failed to save sleep hours. Try again.');
    }
  };

  const hydrationRatio = Math.max(0, Math.min(1, todayWaterLevel / Math.max(waterGoal, 1)));
  const averageMacroProgress = (macroProgress.protein + macroProgress.fats + macroProgress.carbs) / 3;
  const sleepHoursValue = mentalStateDraft.sleepHours !== ''
    ? Number(mentalStateDraft.sleepHours)
    : Number(todayHealthRecord?.sleepHours ?? 0);
  const sleepScore = sleepHoursValue > 0
    ? Math.max(0, Math.min(100, Math.round((sleepHoursValue / 8) * 100)))
    : 0;
  const workoutScore = Math.min(100, Math.round((Math.min(workoutLogs.length, 5) / 5) * 100));
  const energyScore = Math.max(
    0,
    Math.min(100, Math.round((averageMacroProgress * 0.5) + (hydrationRatio * 30) + (workoutScore * 0.2)))
  );
  const focusScore = Math.max(
    0,
    Math.min(100, Math.round((sleepScore * 0.45) + (energyScore * 0.4) + (hydrationRatio * 15) + (workoutScore * 0.1)))
  );
  const mentalState = [
    { label: 'SLEEP', score: sleepScore },
    { label: 'ENERGY', score: energyScore },
    { label: 'FOCUS', score: focusScore },
  ];

  const metricChartValues = [...metricsHistory]
    .map((record) => ({
      date: String(record?.date ?? ''),
      value: Number(record?.weight ?? NaN),
    }))
    .filter((entry) => Number.isFinite(entry.value) && entry.value > 0)
    .slice(0, METRICS_HISTORY_SIZE)
    .reverse();

  const metricChartPoints = metricChartValues.length > 0
    ? metricChartValues.map((entry, index) => {
      const values = metricChartValues.map((item) => item.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue || 1;
      const x = metricChartValues.length === 1 ? 50 : (index / (metricChartValues.length - 1)) * 100;
      const y = 100 - (((entry.value - minValue) / valueRange) * 78 + 11);

      return {
        x: Number(x.toFixed(2)),
        y: Number(y.toFixed(2)),
        date: entry.date,
        value: entry.value,
      };
    })
    : [];

  const metricChartLinePath = buildMetricChartPath(metricChartPoints, false);
  const metricChartAreaPath = buildMetricChartPath(metricChartPoints, true);

  const openWaterModal = (mode: 'LOG' | 'GOAL') => {
    setWaterModalMode(mode);
    setIsWaterModalOpen(true);
  };

  const getHeatmapColor = (amount: number) => {
    const ratio = Math.max(0, Math.min(1, amount / Math.max(waterGoal, 1)));
    const start = { r: 244, g: 244, b: 245 };
    const end = { r: 0, g: 255, b: 148 };
    const r = Math.round(start.r + ((end.r - start.r) * ratio));
    const g = Math.round(start.g + ((end.g - start.g) * ratio));
    const b = Math.round(start.b + ((end.b - start.b) * ratio));

    return `rgb(${r}, ${g}, ${b})`;
  };

  const windowNewest = waterHeatmap[0]?.date;
  const windowOldest = waterHeatmap[waterHeatmap.length - 1]?.date;

  return (
    <div className="h-full flex flex-col min-h-0 max-w-screen">
      <WaterModal 
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
        mode={waterModalMode}
        currentLevel={todayWaterLevel}
        currentGoal={waterGoal}
        onConfirm={handleWaterSubmit}
      />
      <FuelModal 
        isOpen={isFuelModalOpen}
        onClose={() => setIsFuelModalOpen(false)}
        onConfirm={handleFuelLog}
      />
      <RoutineModal 
        isOpen={isRoutineModalOpen}
        onClose={() => setIsRoutineModalOpen(false)}
        onConfirm={handleRoutineCreate}
        availableExercises={exerciseOptions}
        onOpenAddExercise={openAddExerciseFromRoutine}
      />
      <ExerciseModal
        isOpen={isExerciseModalOpen}
        onClose={() => {
          setIsExerciseModalOpen(false);
          setReopenRoutineAfterExercise(false);
        }}
        onConfirm={handleExerciseCreate}
        initialName={exerciseSeedName}
      />
      <DietPlanModal 
        isOpen={isDietPlanModalOpen}
        onClose={() => setIsDietPlanModalOpen(false)}
        onConfirm={handleDietPlanCreate}
      />
      <ReportModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onGenerate={handleReportGenerate}
        onSave={handleReportSave}
        onLoadHistory={loadReportHistory}
        onOpenSavedReport={loadSavedReportDetail}
      />
      <MetricsModal 
        isOpen={isMetricsModalOpen}
        onClose={() => setIsMetricsModalOpen(false)}
        onConfirm={handleMetricsLog}
      />
      
      {/* Top Welcome Header */}
      <header className="bg-kaizen-green p-4 border-b-3 border-kaizen-black">
        <h1 className="font-heading text-white text-xl uppercase tracking-wider">
          WELCOME, {username}
        </h1>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 min-h-0 p-4 overflow-y-auto flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-4 w-full max-w-6xl">
            
          {/* WORKOUT SECTION HEADER */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-b-3 border-black pb-1 mb-2">
            <h2 className="font-heading text-xl uppercase tracking-wider">■ WORKOUT</h2>
          </div>

          {/* 1. Routine */}
          <DashboardCard title="Routine">
            <div className="text-center space-y-3 w-full">
              <h3 className="font-heading text-xl uppercase">{selectedRoutine?.name ?? 'NO ROUTINE YET'}</h3>
              <p className="font-mono text-base text-gray-600">
                {selectedRoutine ? 'Selected for today' : 'Create a routine'}
              </p>
            </div>
            <div className="mt-4 w-full space-y-3">
              <div className="text-left border-2 border-black bg-white p-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading uppercase text-xs font-bold">Description</span>
                  <span className="font-mono text-xs text-gray-600">
                    {selectedRoutineDetails.duration ? `${selectedRoutineDetails.duration} min` : 'Planned'}
                  </span>
                </div>
                <p className="font-mono text-sm text-gray-700">
                  {selectedRoutineDetails.description || 'Create a routine to begin.'}
                </p>
                {selectedRoutineDetails.exercises.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedRoutineDetails.exercises.slice(0, 4).map((exercise: string, index: number) => (
                      <span key={`${exercise}-${index}`} className="border-2 border-black px-2 py-1 font-mono text-[10px] uppercase bg-kaizen-lightgreen">
                        {exercise}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block font-heading uppercase text-xs font-bold text-left">Choose Routine</label>
                <select
                  value={selectedRoutineId ?? ''}
                  onChange={(e) => setSelectedRoutineId(e.target.value || null)}
                  className="w-full border-2 border-black bg-white p-3 font-mono text-sm focus:outline-none focus:bg-kaizen-lightgreen"
                >
                  {routineOptions.length === 0 ? (
                    <option value="">No routines available</option>
                  ) : (
                    routineOptions.map((routine) => (
                      <option key={routine.id} value={routine.id}>
                        {routine.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <NeoButton className="text-base px-4 py-3 w-full" onClick={() => setIsRoutineModalOpen(true)}>
                  CREATE ROUTINE
                </NeoButton>
                <NeoButton className="text-base px-4 py-3 w-full" onClick={handleMarkRoutineCompleted}>
                  MARK AS COMPLETED
                </NeoButton>
              </div>
            </div>
          </DashboardCard>

          {connectedTrackers.length > 0 ? (
            <DashboardCard title="Integrations" className="bg-kaizen-lightgreen">
              <div className="w-full space-y-3">
                <p className="font-mono text-sm text-gray-600 text-center uppercase">Connected Trackers</p>
                <div className="space-y-2">
                  {connectedTrackers.map((tracker) => (
                    <div key={tracker.id} className="flex items-center justify-between border-2 border-black bg-white px-3 py-2">
                      <div>
                        <p className="font-heading uppercase text-sm font-bold">{tracker.name}</p>
                        <p className="font-mono text-[10px] uppercase text-gray-600">{tracker.provider}</p>
                      </div>
                      <span className="font-mono text-[10px] uppercase text-gray-600">Synced {tracker.syncedAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>
          ) : (
            <div className="border-3 border-kaizen-black bg-kaizen-lightgreen p-6 shadow-neo flex flex-col items-center justify-center text-center gap-3 min-h-[180px]">
              <h3 className="font-heading text-xl uppercase font-bold">Integrations</h3>
              <p className="font-mono text-sm text-gray-700 max-w-sm">
                Connect Google Fit, Fitbit, or other trackers to show synced activity here.
              </p>
              <NeoButton className="text-base px-4 py-3 w-full max-w-xs font-bold" onClick={() => navigate('/settings')}>
                ADD INTEGRATIONS
              </NeoButton>
            </div>
          )}

          {/* NUTRITION SECTION HEADER */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-b-3 border-black pb-1 mb-2 mt-2">
            <h2 className="font-heading text-xl uppercase tracking-wider">■ NUTRITION</h2>
          </div>

          {/* 2. Fuel Gauge */}
          <DashboardCard title="Fuel Gauge">
            <div className="w-full h-full flex flex-col justify-center gap-4 space-y-3 font-heading uppercase text-sm">
              {[
                { label: "PROTEIN", width: `${macroProgress.protein}%` },
                { label: "FATS", width: `${macroProgress.fats}%` },
                { label: "CARBS", width: `${macroProgress.carbs}%` },
              ].map((macro) => (
                <div key={macro.label} className="flex items-center gap-2">
                  <span className="w-16 text-right text-sm font-bold">{macro.label}</span>
                  <div className="flex-1 h-5 border-2 border-black rounded-full overflow-hidden bg-white">
                    <div className="h-full bg-black" style={{ width: macro.width }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              <NeoButton
                className="text-base px-4 py-3 w-full font-bold"
                onClick={() => navigate('/nutrition')}
              >
                MORE ACTIONS
              </NeoButton>
            </div>
          </DashboardCard>

          {/* 3. Hydration */}
          <DashboardCard title="Hydration">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setWaterPage((prev) => Math.max(0, prev - 1))}
                  disabled={waterPage === 0}
                  className="w-8 h-8 border-2 border-black font-heading text-base font-bold disabled:opacity-30 flex items-center justify-center"
                >
                  ←
                </button>
                <div className="mb-2 pt-2 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-600">Window Range</p>
                <p className="font-heading text-sm uppercase font-bold mt-1">
                  {windowOldest && windowNewest
                    ? `${formatHydrationDate(windowOldest)} - ${formatHydrationDate(windowNewest)}`
                    : 'Loading'}
                </p>
              </div>
                <button
                  onClick={() => setWaterPage((prev) => prev + 1)}
                  className="w-8 h-8 border-2 border-black font-heading text-base font-bold flex items-center justify-center"
                >
                  →
                </button>
              </div>

              

              <div className="grid grid-cols-8 gap-2 justify-items-center">
                {waterHeatmap.map((entry) => {
                  const isSelected = selectedWaterEntry?.date === entry.date;

                  return (
                    <button
                      key={entry.date}
                      type="button"
                      onClick={() => setSelectedWaterEntry(entry)}
                      className={`w-6 h-6 border-2 border-black cursor-pointer hover:opacity-75 transition relative ${isSelected ? 'ring-2 ring-black ring-offset-2 ring-offset-kaizen-lightgreen' : ''}`}
                      title={`${formatHydrationDate(entry.date)}: ${entry.amount}ml`}
                      aria-label={`Hydration entry for ${formatHydrationDate(entry.date)} with ${entry.amount} milliliters`}
                      style={{ backgroundColor: getHeatmapColor(entry.amount) }}
                    />
                  );
                })}
              </div>

              {selectedWaterEntry && (
                <div className="mt-4 border-2 border-black bg-white px-3 py-2 text-center shadow-neo">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-600">Selected Day</p>
                  <p className="font-heading text-sm uppercase font-bold mt-1">
                    {formatHydrationDate(selectedWaterEntry.date)} · {selectedWaterEntry.amount}ml
                  </p>
                </div>
              )}

              <p className="font-mono text-sm uppercase text-gray-700 mt-4 text-center font-bold">
                {todayWaterLevel}ml/{waterGoal}ml
              </p>
            </div>
            <div className="flex gap-2 mt-4 w-full">
              <NeoButton 
                className="flex-1 text-base px-2 py-3 font-bold" 
                onClick={() => openWaterModal('LOG')}
              >
                LOG
              </NeoButton>
              <NeoButton 
                className="flex-1 text-base px-2 py-3 font-bold"
                onClick={() => openWaterModal('GOAL')}
              >
                GOAL
              </NeoButton>
            </div>
          </DashboardCard>

          {/* WELLNESS SECTION HEADER */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 border-b-3 border-black pb-1 mb-2 mt-2">
            <h2 className="font-heading text-xl uppercase tracking-wider">■ WELLNESS</h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* 4. Intel */}
            <DashboardCard title="Intel" className="bg-kaizen-lightgreen h-auto">
              <div className="text-center space-y-2 w-full">
                <h3 className="font-heading text-lg uppercase font-bold">PLATEAU</h3>
                <p className="font-mono text-base text-gray-600">
                  WEIGHT STAGNANT
                </p>
              </div>
              <NeoButton className="mt-4 text-base px-4 py-3 w-full font-bold" onClick={() => setIsReportModalOpen(true)}>REPORT</NeoButton>
            </DashboardCard>

            {/* 5. Metrics */}
            <DashboardCard title="Metrics" className="bg-kaizen-lightgreen h-auto">
              <div className="w-full flex justify-between font-heading uppercase mb-3 text-base font-bold">
                <span className="text-2xl mx-3">{latestMetrics?.weight ? `${latestMetrics.weight}KG` : '—'}</span>
                <span className="text-lg self-end mx-3">{latestMetrics?.bodyFat ? `${latestMetrics.bodyFat}%` : 'N/A'}</span>
              </div>
              <div className="w-full border-b-2 border-black relative mt-3 h-14">
                 <svg viewBox="0 0 100 100" className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
                   {metricChartPoints.length > 0 ? (
                     <>
                       <path d={metricChartAreaPath} fill="#00FF94" fillOpacity="0.45" stroke="none" />
                       <path d={metricChartLinePath} fill="none" stroke="black" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                       {metricChartPoints.map((point) => (
                         <circle
                           key={`${point.date}-${point.value}`}
                           cx={point.x}
                           cy={point.y}
                           r="1.8"
                           fill="black"
                         />
                       ))}
                     </>
                   ) : (
                     <text x="50" y="52" textAnchor="middle" className="font-heading text-[10px] uppercase" fill="#111827">
                       NO WEIGHT DATA
                     </text>
                   )}
                 </svg>
              </div>
              <p className="font-mono text-sm uppercase text-gray-700 mt-2 text-center font-bold">
                WEIGHT TREND
              </p>
               <div className="flex gap-2 mt-4 w-full">
                <NeoButton className="flex-1 text-base py-3 px-2 font-bold" onClick={() => setIsMetricsModalOpen(true)}>LOG</NeoButton>
              </div>
            </DashboardCard>
          </div>

          {/* 9. Mental State */}
          <DashboardCard title="Mental State" className="bg-kaizen-lightgreen">
            <div className="w-full space-y-3 font-heading uppercase text-sm text-center mb-3">
              {mentalState.map((state) => (
                <div key={state.label}>
                  <div className="mb-2 text-sm font-bold">{state.label}</div>
                  <div className="h-7 border-2 border-black rounded-full bg-white overflow-hidden relative font-mono text-sm">
                    <div
                      className="absolute inset-y-0 left-0 bg-kaizen-green border-r-2 border-black"
                      style={{ width: `${state.score}%` }}
                    ></div>
                    <div className="relative h-full w-full flex items-center justify-center font-bold">
                      <span>{state.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full border-t-2 border-black pt-3 mt-1 space-y-3">
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-heading uppercase text-xs font-bold">Sleep Hours</span>
                  <span className="font-mono text-xs text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMentalStateDraft((prev) => {
                      const current = Number(prev.sleepHours || 0);
                      return { ...prev, sleepHours: Math.max(0, current - 0.5).toFixed(1) };
                    })}
                    className="w-12 h-12 border-2 border-black bg-white text-xl font-heading hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>

                  <div className="flex-1 border-2 border-black bg-white py-3 text-center">
                    <div className="font-heading text-3xl leading-none">
                      {mentalStateDraft.sleepHours !== '' ? Number(mentalStateDraft.sleepHours).toFixed(1) : '0.0'}
                      <span className="text-lg text-gray-500">h</span>
                    </div>
                    <p className="font-mono text-[10px] uppercase mt-1 text-gray-600">
                      ENTER SLEEP FOR TODAY
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMentalStateDraft((prev) => {
                      const current = Number(prev.sleepHours || 0);
                      return { ...prev, sleepHours: Math.min(16, current + 0.5).toFixed(1) };
                    })}
                    className="w-12 h-12 border-2 border-black bg-white text-xl font-heading hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[6, 7.5, 9].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setMentalStateDraft((prev) => ({ ...prev, sleepHours: String(amt) }))}
                      className={`py-2 border-2 border-black font-heading text-xs hover:bg-black hover:text-white transition-all uppercase ${Number(mentalStateDraft.sleepHours || 0) === amt ? 'bg-kaizen-green' : 'bg-white'}`}
                    >
                      {amt}h
                    </button>
                  ))}
                </div>
              </div>
              <NeoButton className="w-full text-base py-3 px-2 font-bold" onClick={handleMentalStateLog}>
                SAVE TODAY
              </NeoButton>
            </div>
          </DashboardCard>

        </div>
      </main>
    </div>
  );
}