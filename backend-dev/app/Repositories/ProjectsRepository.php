<?php
namespace App\Repositories;
use App\Http\Resources\ProjectsResource;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectSkill;
use App\Models\Skill;

class ProjectsRepository {

    /**
     * Atgriež visus projektus.
     */
    public function getAllProjects ()
    {
        return Project::all();
    }

    /**
     * Izveido jaunu projektu.
     */
    public function createProject ($data)
    {
        // Izveido projektu, izmantojot ievadītos datus
        $project = Project::create($data);

        // Ja ir norādītas prasmes, saglabā projekta un prasmju saistības
        if (isset($data['skills'])) {
            $skills_array = [];

            // Pārveido prasmes datus un sagatavo masīvu ierakstiem
            foreach ($data['skills'] as $skill) {
                array_push($skills_array, [
                    'project_id' => $project->id,
                    'skill_id' => $skill['id']
                ]);
            }

            // Ievieto prasmes un projekta saistības datu bāzē
            ProjectSkill::insert($skills_array);
        }

        // Ja ir norādīti dalībnieki, saglabā projekta un dalībnieku saistības
        if (isset($data['members'])) {
            $members_array = [];

            // Pārveido dalībnieku datus un sagatavo masīvu ierakstiem
            foreach ($data['members'] as $member) {
                array_push($members_array, [
                    'project_id' => $project->id,
                    'user_id' => $member['id']
                ]);
            }

            // Ievieto dalībniekus un projekta saistības datu bāzē
            ProjectMember::insert($members_array);
        }

        // Atjauno projektu datu modeli ar jaunāko informāciju
        return $project->refresh();
    }

    /**
     * Atgriež projektu pēc norādītā identifikatora.
     */
    public function getProjectById(int $id)
    {
        return Project::find($id);
    }

    /**
     * Atjauno projektu ar jauniem datiem.
     */
    public function updateProject(Project $project, array $data)
    {
        // Atjauno projektu ar jaunajiem datiem
        $update = $project->update($data);

        // Dzēš esošās projekta un prasmju saistības
        ProjectSkill::where('project_id', $project->id)->delete();
        ProjectMember::where('project_id', $project->id)->delete();

        // Ja ir norādītas prasmes, saglabā tās projekta un prasmju saistības
        if (isset($data['skills'])) {
            $skills_array = [];

            // Pārveido prasmes datus un sagatavo masīvu ierakstiem
            foreach ($data['skills'] as $skill) {
                array_push($skills_array, [
                    'project_id' => $project->id,
                    'skill_id' => $skill['id']
                ]);
            }

            // Ievieto prasmes un projekta saistības datu bāzē
            ProjectSkill::insert($skills_array);
        }

        // Ja ir norādīti dalībnieki, saglabā tos projekta un biedru saistības
        if (isset($data['members'])) {
            $members_array = [];

            // Pārveido dalībnieku datus un sagatavo masīvu ierakstiem
            foreach ($data['members'] as $member) {
                array_push($members_array, [
                    'project_id' => $project->id,
                    'user_id' => $member['id']
                ]);
            }

            // Ievieto dalībniekus un projekta saistības datu bāzē
            ProjectMember::insert($members_array);
        }

        // Atjauno projektu datu modeli ar jaunāko informāciju
        return $project->refresh();
    }

    /**
     * Dzēš norādīto projektu.
     */
    public function deleteProject(Project $project)
    {
        // Dzēš projektu
        return $project->delete();
    }
}
